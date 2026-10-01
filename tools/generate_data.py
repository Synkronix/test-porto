"""Generate assets/data.js for the portfolio v2 site from the LIVE KroomBase database.

Emits a classic script (window.PORTFOLIO = {...}) so index.html opens straight
from disk via file:// with no server and no module CORS issues.

Certificate slots are emitted as empty placeholders on purpose: nothing about
your credentials is invented. Fill them in via the CERTIFICATES list below, or
edit them straight in the generated data.js.
"""
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

PROJECT_ID = "59126794f35744fd9c3ea4c618241d3b"
MCP_URL = "https://kroombase.kroombox.com/mcp"
OUT = Path(__file__).resolve().parent.parent / "assets" / "data.js"

ENV_CANDIDATES = [
    Path(r"E:\hermes\.env"),
    Path.home() / ".hermes" / ".env",
]

# ---------------------------------------------------------------------------
# Certificate slots. Replace the empty strings with your real credentials, or
# edit assets/data.js after generating. Leave as-is and the site renders a
# clearly-marked "empty slot" card instead of pretending a certificate exists.
# ---------------------------------------------------------------------------
CERTIFICATES = [
    {
        "title": "", "issuer": "", "issued": "", "credentialId": "", "url": "",
        "skills": [], "image": "", "highlight": True,
    },
    {"title": "", "issuer": "", "issued": "", "credentialId": "", "url": "", "skills": [], "image": ""},
    {"title": "", "issuer": "", "issued": "", "credentialId": "", "url": "", "skills": [], "image": ""},
    {"title": "", "issuer": "", "issued": "", "credentialId": "", "url": "", "skills": [], "image": ""},
    {"title": "", "issuer": "", "issued": "", "credentialId": "", "url": "", "skills": [], "image": ""},
    {"title": "", "issuer": "", "issued": "", "credentialId": "", "url": "", "skills": [], "image": ""},
]


def token() -> str:
    tok = os.environ.get("KROOMBASE_API_KEY")
    if tok:
        return tok.strip()
    for env_path in ENV_CANDIDATES:
        if env_path.exists():
            m = re.search(r"^MCP_KROOMBASE_API_KEY=(.*)$",
                          env_path.read_text(encoding="utf-8", errors="replace"), re.M)
            if m:
                return m.group(1).strip().strip('"').strip("'")
    sys.exit("No KroomBase API key found (set KROOMBASE_API_KEY or add MCP_KROOMBASE_API_KEY to .env)")


def mcp(method: str, params: dict, req_id: int = 1) -> dict:
    body = json.dumps({"jsonrpc": "2.0", "id": req_id, "method": method, "params": params}).encode()
    req = urllib.request.Request(
        MCP_URL, data=body,
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream",
            "Authorization": f"Bearer {token()}",
            "User-Agent": "hermes-agent/0.21.4",
            "MCP-Protocol-Version": "2024-11-05",
        },
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        raw = resp.read().decode()
    for line in raw.splitlines():
        line = line.strip()
        if line.startswith("data:"):
            line = line[5:].strip()
        if line.startswith("{"):
            return json.loads(line)
    return json.loads(raw)


def q(sql: str):
    out = mcp("tools/call", {"name": "run_sql",
                             "arguments": {"projectId": PROJECT_ID, "query": sql}}, 3)
    res = out.get("result", {})
    if res.get("isError"):
        sys.exit("SQL error: " + json.dumps(res)[:800])
    return json.loads(res["content"][0]["text"])["statements"][-1].get("rows", [])


def main() -> None:
    profile = q("SELECT * FROM profiles ORDER BY id LIMIT 1")
    profile = profile[0] if profile else {}

    cats = q("SELECT id, name, sort_order FROM skill_categories ORDER BY sort_order, id")
    skills = q("SELECT id, category_id, name, proficiency FROM skills ORDER BY sort_order, name")
    projects = q("""SELECT id, slug, title, summary, body, course, role,
                           status, featured, sort_order
                    FROM projects ORDER BY sort_order, id""")
    pskills = q("""SELECT ps.project_id, s.name FROM project_skills ps
                   JOIN skills s ON s.id = ps.skill_id ORDER BY s.sort_order""")
    pmedia = q("""SELECT project_id, kind, url, caption FROM project_media
                  ORDER BY project_id, sort_order""")
    courses = q("SELECT code, name, summary FROM courses ORDER BY code")

    groups = {str(c["id"]): {"name": c["name"], "skills": []} for c in cats}
    for s in skills:
        g = groups.get(str(s["category_id"]))
        if g:
            g["skills"].append({"name": s["name"], "proficiency": int(s["proficiency"])})

    sk = {}
    for r in pskills:
        sk.setdefault(str(r["project_id"]), []).append(r["name"])
    md = {}
    for m in pmedia:
        md.setdefault(str(m["project_id"]), []).append(
            {"kind": m["kind"], "url": m["url"], "caption": m["caption"]})

    plist = []
    for p in projects:
        plist.append({
            "id": p["id"],
            "slug": p["slug"],
            "title": p["title"],
            "summary": p["summary"],
            "body": p["body"],
            "course": p["course"],
            "role": p["role"],
            "status": p["status"],
            "featured": bool(p["featured"]),
            "skills": sk.get(str(p["id"]), []),
            "media": md.get(str(p["id"]), []),
        })

    total_media = sum(len(v) for v in md.values())

    payload = {
        "profile": {
            "fullName": profile.get("full_name"),
            "nim": profile.get("nim"),
            "classGroup": profile.get("class_group"),
            "program": profile.get("program"),
            "headline": profile.get("headline"),
            "bio": profile.get("bio"),
            "location": profile.get("location"),
            "email": profile.get("email"),
            "githubUrl": profile.get("github_url"),
            "linkedinUrl": profile.get("linkedin_url"),
            "placeholders": profile.get("email") == "you@example.com",
        },
        "skillGroups": list(groups.values()),
        "projects": plist,
        "courses": courses,
        "certificates": CERTIFICATES,
        "counts": {
            "projects": len(plist),
            "featured": sum(1 for p in plist if p["featured"]),
            "skills": len(skills),
            "courses": len(courses),
            "artifacts": total_media,
            "certificates": sum(1 for c in CERTIFICATES if c["title"]),
            "certificateSlots": len(CERTIFICATES),
        },
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        "/* Generated from the live KroomBase database - do not hand-edit.\n"
        "   Regenerate with: python tools/generate_data.py */\n"
        "window.PORTFOLIO = " + json.dumps(payload, indent=2, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )
    print("wrote", OUT)
    print("projects:", payload["counts"]["projects"],
          "featured:", payload["counts"]["featured"],
          "skills:", payload["counts"]["skills"],
          "courses:", payload["counts"]["courses"],
          "artifacts:", total_media,
          "certificate slots:", payload["counts"]["certificateSlots"])


if __name__ == "__main__":
    main()
