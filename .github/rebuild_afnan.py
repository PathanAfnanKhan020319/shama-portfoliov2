from pathlib import Path
import re

ROOT = Path('.')

replacements = {
    'Syeda Shamama Afeef': 'Pathan Afnan Khan',
    'syedashamama459@gmail.com': 'afnankhan67445@gmail.com',
    'https://www.linkedin.com/in/syeda-shamama-afeef/': 'https://www.linkedin.com/in/afnan-khan4/',
    'https://x.com/syeda_shamama19': 'https://x.com/AfnanKhan',
}

for path in list((ROOT / 'src').rglob('*.js')) + list((ROOT / 'src').rglob('*.jsx')):
    text = path.read_text(encoding='utf-8')
    for old, new in replacements.items():
        text = text.replace(old, new)
    text = re.sub(
        r'mailto:[^"\']*(?:syeda|shamama)[^"\']*',
        'mailto:afnankhan67445@gmail.com',
        text,
        flags=re.I,
    )
    path.write_text(text, encoding='utf-8')

index = ROOT / 'src/pages/index.js'
text = index.read_text(encoding='utf-8')
text = text.replace(
    'import profilePic from "../../public/images/profile/bebo 3.png";',
    'import profilePic from "../../public/images/profile/afsham.png";'
)
text = text.replace(
    'href="/Resum_syeda_shamama_afeef123.pdf"',
    'href="/afnans.pdf"'
)
index.write_text(text, encoding='utf-8')

about = ROOT / 'src/pages/about.js'
text = about.read_text(encoding='utf-8')
text = text.replace(
    'import profilePic from "../../public/images/profile/fine.png";',
    'import profilePic from "../../public/images/profile/afsham.png";'
)
about.write_text(text, encoding='utf-8')

navbar = ROOT / 'src/components/NavBar.js'
text = navbar.read_text(encoding='utf-8')
text = text.replace(
    'href: "https://github.com/shamamaafeef2003",',
    'href: "https://github.com/PathanAfnanKhan020319",'
)
navbar.write_text(text, encoding='utf-8')

experience = ROOT / 'src/components/Experience.js'
text = experience.read_text(encoding='utf-8')
pattern = re.compile(
    r'  \{\n    id: "aviato",.*?\n  \},\n\n  \{\n    id: "gwen",',
    re.S,
)
replacement = '''  {
    id: "deliverhealth",
    number: "01",
    year: "2026",
    position: "Agentic AI Specialist",
    company: "DeliverHealth Solutions",
    companyLink: "https://www.deliverhealth.com/",
    time: "MARCH 2026 — JUNE 2026",
    address: "United States",
    type: "Healthcare AI / Agentic AI",

    summary:
      "Led end-to-end development and production deployment of secure enterprise AI products for healthcare operations, including DASH 2.0, Case Management Automation, SlideNarrator, and an RFP Processing Chatbot across Azure, FastAPI, Next.js, and Microsoft Copilot Studio.",

    highlights: [
      "Led end-to-end development and production deployment of DASH 2.0, an enterprise AI assistant built with LangChain, Azure OpenAI, Node.js, and SSO authentication for secure healthcare workflows.",
      "Contributed to the Case Management Automation Tool using Next.js, FastAPI, and Azure Blob Storage, implementing HIPAA-compliant security and cloud-native healthcare workflows.",
      "Architected and deployed SlideNarrator using Azure Neural TTS, FastAPI, and Next.js, supporting bulk PPT, PDF, and image uploads up to 100 MB and generating narrated presentations in 30–35 seconds with 6 configurable voices.",
      "Developed an RFP Processing Chatbot using Microsoft Copilot Studio and Dataverse with 132+ domain-specific Q&A while supporting HITRUST/GRC-compliant production AI deployment.",
    ],

    tech: [
      "LangChain",
      "Azure OpenAI",
      "FastAPI",
      "Next.js",
      "Microsoft Copilot Studio",
      "Azure Neural TTS",
      "SSO",
      "Healthcare AI",
    ],

    metrics: [
      { value: "30–35s", label: "Narration Generation" },
      { value: "100 MB", label: "Bulk File Support" },
      { value: "6", label: "Configurable Voices" },
      { value: "132+", label: "RFP Domain Q&A" },
    ],

    visual: "orbit",
  },

  {
    id: "gwen",'''
text, count = pattern.subn(replacement, text, count=1)
if count != 1:
    raise SystemExit(f'Expected one Aviato experience replacement, got {count}')
experience.write_text(text, encoding='utf-8')

education = ROOT / 'src/components/Education.js'
text = education.read_text(encoding='utf-8')
pattern = re.compile(
    r'  \{\n    id: "mba",.*?\n  \},\n\n  \{\n    id: "btech",',
    re.S,
)
text, count = pattern.subn('  {\n    id: "btech",', text, count=1)
if count != 1:
    raise SystemExit(f'Expected one MBA removal, got {count}')
text = re.sub(r'(id: "btech",\n    number: )"02"', r'\1"01"', text, count=1)
text = re.sub(r'(id: "coursework",\n    number: )"03"', r'\1"02"', text, count=1)
text = text.replace('03 / 03', '02 / 02').replace('03 ENTRIES', '02 ENTRIES')
education.write_text(text, encoding='utf-8')

print('Afnan premium portfolio patch applied successfully.')
