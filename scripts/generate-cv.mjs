import { mkdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const outputPath = resolve(projectRoot, "public/rovic-joy-botones-cv.pdf")
const pageWidth = 595
const pageHeight = 842
const margin = 42
const pages = [[]]
let y = 0

function currentPage() {
  return pages[pages.length - 1]
}

function escapePdfText(value) {
  return value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)")
}

function text(x, top, value, { font = "F1", size = 9, color = "0.12 0.12 0.12" } = {}) {
  currentPage().push(`BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x} ${pageHeight - top} Tm (${escapePdfText(value)}) Tj ET`)
}

function rule(top) {
  currentPage().push(`0.82 G 0.6 w ${margin} ${pageHeight - top} m ${pageWidth - margin} ${pageHeight - top} l S`)
}

function ensureSpace(height) {
  if (y + height <= pageHeight - margin) return
  pages.push([])
  y = 48
  text(margin, y, "ROVIC JOY BOTONES | CV (CONTINUED)", { font: "F2", size: 9, color: "0.35 0.35 0.35" })
  y += 18
  rule(y - 7)
}

function wrap(value, limit = 98) {
  const words = value.split(/\s+/)
  const lines = []
  let line = ""

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (candidate.length > limit && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }

  if (line) lines.push(line)
  return lines
}

function sectionHeading(label) {
  ensureSpace(26)
  y += 4
  text(margin, y, label.toUpperCase(), { font: "F2", size: 9.5, color: "0.25 0.25 0.25" })
  rule(y + 6)
  y += 20
}

function paragraph(value, { indent = 0, limit = 98, size = 8.7, lineHeight = 11.5 } = {}) {
  const lines = wrap(value, limit)
  ensureSpace(lines.length * lineHeight + 2)
  lines.forEach((line) => {
    text(margin + indent, y, line, { size })
    y += lineHeight
  })
  y += 2
}

function bullet(value) {
  const lines = wrap(value, 96)
  ensureSpace(lines.length * 11.5 + 2)
  text(margin + 3, y, "-", { size: 8.7 })
  lines.forEach((line, index) => {
    text(margin + (index === 0 ? 14 : 23), y, line, { size: 8.7 })
    y += 11.5
  })
  y += 2
}

text(margin, 47, "ROVIC JOY BOTONES", { font: "F2", size: 22, color: "0.04 0.04 0.04" })
text(margin, 67, "AI FULL STACK SOFTWARE ENGINEER", { font: "F2", size: 10, color: "0.30 0.30 0.30" })
text(margin, 84, "Tanza Cavite, Philippines", { size: 8.5, color: "0.35 0.35 0.35" })
text(margin, 98, "Phone: +63 966 548 8613  |  Email: rovicbotones62@gmail.com", { size: 8.3 })
text(margin, 112, "GitHub: github.com/rovicBotones  |  Portfolio: rovicbotones.vercel.app  |  LinkedIn: linkedin.com/in/rovicbotones", { size: 7.8 })
rule(123)
y = 142

sectionHeading("Professional Summary")
paragraph("Detail-oriented AI Full Stack Software Engineer with 3+ years of experience developing and maintaining web applications. Proficient in C#.NET, JavaScript, TypeScript, PHP, and SQL, and experienced in using AI tools and large language models (LLMs) to accelerate development, debugging, code review, and technical documentation. Hands-on experience in Agile methodologies and collaborative development environments. Skilled in problem-solving and optimizing code for performance and scalability, with a track record of delivering high-quality software that improves user experience and supports business goals.", { limit: 100 })

sectionHeading("Technical Skills")
const skills = [
  ["Languages", "C#, JavaScript, TypeScript, PHP, SQL"],
  ["Frameworks", ".NET Framework (MVC, Web API), .NET Core, Entity Framework, LINQ, React JS, React Native, Expo, React Router 7, Laravel, CodeIgniter 3"],
  ["Databases", "Microsoft SQL Server, PostgreSQL, MySQL"],
  ["Tools and Platforms", "Git, Team Foundation Server (TFS), Azure DevOps Services"],
  ["AI and Automation", "AI-assisted software development, LLM tools (Claude), prompt engineering, Model Context Protocol (MCP)"],
  ["APIs and Integrations", "REST APIs, WordPress REST API, Meta Graph API"],
  ["Practices", "Agile/Scrum, Full Stack Web Development, SaaS Development, AI-Augmented Development Workflows"],
]
for (const [category, details] of skills) paragraph(`${category}: ${details}`, { indent: 0, limit: 100, size: 8.4, lineHeight: 10.8 })

sectionHeading("Work Experience")
const jobs = [
  {
    title: "Software Engineer (Full Stack)",
    meta: "Excent One | July 2025 - Present",
    bullets: [
      "Develop and maintain full stack web applications using .NET Framework (MVC and Web API).",
      "Build modular features for the Excent One HRIS SaaS platform, which serves local and international client companies.",
    ],
  },
  {
    title: "Junior Software Engineer (Full Stack)",
    meta: "Microsource Inc. | July 2023 - July 2025",
    bullets: [
      "Developed and maintained full stack web applications using .NET Framework (MVC and Web API).",
      "Built and supported multiple web applications serving internal clients of Microsource Inc.",
      "Collaborated with a team of 13 engineers using Azure DevOps to deliver scalable solutions aligned with business objectives and regulatory requirements.",
    ],
  },
]
for (const job of jobs) {
  ensureSpace(40)
  text(margin, y, job.title, { font: "F2", size: 9.5 })
  y += 13
  text(margin, y, job.meta, { size: 8.4, color: "0.35 0.35 0.35" })
  y += 13
  for (const item of job.bullets) bullet(item)
  y += 3
}

sectionHeading("Projects")
text(margin, y, "PB Post Machine", { font: "F2", size: 9.5 })
y += 13
paragraph("React Router 7, WordPress REST API, Meta Graph API", { size: 8.2, limit: 100, lineHeight: 10.8 })
bullet("Automated embedded Facebook posting to the People's Balita Facebook Page.")
bullet("Automated the reporting service for tabloid production.")

sectionHeading("Education")
text(margin, y, "Bachelor of Science in Information Technology", { font: "F2", size: 9 })
y += 12
paragraph("Pamantasan ng Lungsod ng Valenzuela | 2019 - 2023", { size: 8.4, lineHeight: 10.8 })
text(margin, y, "Senior High School, Science, Technology, Engineering, and Mathematics (STEM) Track", { font: "F2", size: 8.6 })
y += 12
paragraph("Our Lady of Fatima University | 2016 - 2018", { size: 8.4, lineHeight: 10.8 })

const pageObjects = pages.map((commands) => commands.join("\n"))
const firstFontObject = 3 + pageObjects.length * 2
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  `<< /Type /Pages /Kids [${pageObjects.map((_, index) => `${3 + index * 2} 0 R`).join(" ")}] /Count ${pageObjects.length} >>`,
]

for (let index = 0; index < pageObjects.length; index += 1) {
  const pageObjectId = 3 + index * 2
  const contentObjectId = pageObjectId + 1
  const content = pageObjects[index]
  objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${firstFontObject} 0 R /F2 ${firstFontObject + 1} 0 R >> >> /Contents ${contentObjectId} 0 R >>`)
  objects.push(`<< /Length ${Buffer.byteLength(content, "ascii")} >>\nstream\n${content}\nendstream`)
}

objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")

let pdf = "%PDF-1.4\n"
const offsets = [0]
for (let index = 0; index < objects.length; index += 1) {
  offsets.push(Buffer.byteLength(pdf, "ascii"))
  pdf += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`
}

const xrefOffset = Buffer.byteLength(pdf, "ascii")
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (const offset of offsets.slice(1)) pdf += `${String(offset).padStart(10, "0")} 00000 n \n`
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, Buffer.from(pdf, "ascii"))
process.stdout.write(`Created ${outputPath} (${pages.length} page${pages.length === 1 ? "" : "s"})\n`)
