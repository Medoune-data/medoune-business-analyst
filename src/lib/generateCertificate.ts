import { jsPDF } from "jspdf";
import QRCode from "qrcode";

interface CertificateData {
  id: string;
  studentName: string;
  courseTitle: string;
  issueDate: string;
  duration?: string;
  level?: string;
  mention?: string;
  projectDescription?: string;
  projectUrl?: string;
}

// ─── COURSE CONFIG (pattern matching pour eviter les problemes d'accents) ────
const COURSE_CONFIG_LIST = [
  {
    pattern: /excel/i,
    accent: [16, 185, 129] as [number, number, number],
    accentHex: "#10b981",
    shortName: "EXCEL PRO",
    label: "Data Analysis - Office",
    description:
      "Les participants ayant complete ce programme ont developpe des competences " +
      "pratiques pour nettoyer, analyser et visualiser des donnees avec Excel. " +
      "Ils maitrisent la creation de dashboards interactifs, les formules avancees " +
      "et l'automatisation des rapports pour la prise de decision en entreprise.",
    skills: [
      "Tableaux croises dynamiques",
      "Dashboards interactifs",
      "Formules avancees (INDEX/EQUIV, OFFSET)",
      "Power Query & transformation de donnees",
      "Visualisation & nettoyage de fichiers",
    ],
  },
  {
    pattern: /sql/i,
    accent: [59, 130, 246] as [number, number, number],
    accentHex: "#3b82f6",
    shortName: "SQL MASTER",
    label: "Data Analysis - Database",
    description:
      "Les participants ayant complete ce programme maitrisent l'interrogation " +
      "et la manipulation de bases de donnees relationnelles avec SQL. " +
      "Ils sont competents dans l'ecriture de requetes complexes, l'optimisation " +
      "des performances et l'extraction de donnees pour l'analyse metier.",
    skills: [
      "Requetes complexes (JOIN, CTE, Subqueries)",
      "Window Functions (RANK, LAG, ROW_NUMBER)",
      "Optimisation de requetes & index",
      "Gestion de bases de donnees relationnelles",
      "Extraction & transformation de donnees",
    ],
  },
  {
    pattern: /\br\b|rstudio|strateg/i,
    accent: [139, 92, 246] as [number, number, number],
    accentHex: "#8b5cf6",
    shortName: "R STRATEGY",
    label: "Data Science - Strategy",
    description:
      "Les participants ayant complete ce programme ont acquis des competences " +
      "en modelisation econometrique et en analyse predictive avec R. " +
      "Ils savent preparer, analyser et visualiser des donnees complexes " +
      "pour orienter la strategie de revenus et la prise de decision.",
    skills: [
      "Modelisation econometrique",
      "Analyse de regression (OLS, Logit)",
      "Visualisation avancee (ggplot2)",
      "Nettoyage de donnees (dplyr / tidyr)",
      "Segmentation RFM & clustering",
    ],
  },
];

function getCourseConfig(courseTitle: string) {
  return COURSE_CONFIG_LIST.find(c => c.pattern.test(courseTitle)) ?? COURSE_CONFIG_LIST[0];
}

const MENTION_CONFIG: Record<string, { label: string; r: number; g: number; b: number }> = {
  "Excellence": { label: "MENTION EXCELLENCE", r: 217, g: 119, b: 6  },
  "Tres Bien":  { label: "MENTION TRES BIEN",  r: 16,  g: 185, b: 129 },
  "Bien":       { label: "MENTION BIEN",        r: 59,  g: 130, b: 246 },
  "Passable":   { label: "MENTION PASSABLE",    r: 107, g: 114, b: 128 },
};

// Charge une image depuis une URL/path et retourne base64
async function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
    setTimeout(() => resolve(null), 2000);
  });
}

export async function generateCertificatePDF(cert: CertificateData): Promise<void> {
  // ─── FORMAT PORTRAIT A4 ────────────────────────────────────────────────────
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;
  const cfg = getCourseConfig(cert.courseTitle);
  const [ar, ag, ab] = cfg.accent;
  const mention = cert.mention ? MENTION_CONFIG[cert.mention] ?? MENTION_CONFIG["Bien"] : null;

  // ─── 1. FOND BLANC ────────────────────────────────────────────────────────
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, H, "F");

  // ─── 2. BORDURES DECORATIVES ──────────────────────────────────────────────
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(2);
  doc.rect(8, 8, W - 16, H - 16);

  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.4);
  doc.setGState(doc.GState({ opacity: 0.25 }));
  doc.rect(12, 12, W - 24, H - 24);
  doc.setGState(doc.GState({ opacity: 1 }));

  // ─── 3. HEADER ────────────────────────────────────────────────────────────
  // Bande couleur header
  doc.setFillColor(ar, ag, ab);
  doc.rect(8, 8, W - 16, 28, "F");

  // Charger logos
  const [logoEvalis, logoAdn] = await Promise.all([
    loadImage("/logo-evalis.png"),
    loadImage("/logo-adn.png"),
  ]);

  // Logo Evalis (gauche)
  if (logoEvalis) {
    doc.addImage(logoEvalis, "PNG", 14, 11, 28, 22);
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text("EVALIS CORP", 16, 25);
  }

  // Logo ADN Academy (droite)
  if (logoAdn) {
    doc.addImage(logoAdn, "PNG", W - 44, 11, 28, 22);
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text("ADN ACADEMY", W - 44, 25);
  }

  // Titre centre header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("CERTIFICAT DE FORMATION PROFESSIONNELLE", W / 2, 20, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setGState(doc.GState({ opacity: 0.8 }));
  doc.text(cfg.label, W / 2, 27, { align: "center" });
  doc.setGState(doc.GState({ opacity: 1 }));

  // ─── 4. CORPS PRINCIPAL ───────────────────────────────────────────────────
  let y = 52;
  const mx = 20; // margin left/right

  // "Ce document certifie que"
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("Ce document certifie que", W / 2, y, { align: "center" });
  y += 12;

  // NOM ETUDIANT — grand, centré
  const nameStr = cert.studentName.toUpperCase();
  doc.setFont("times", "bold");
  let fs = 36;
  doc.setFontSize(fs);
  while (doc.getTextWidth(nameStr) > W - 40 && fs > 20) {
    fs -= 1;
    doc.setFontSize(fs);
  }
  doc.setTextColor(15, 15, 15);
  doc.text(nameStr, W / 2, y, { align: "center" });
  y += 4;

  // Ligne déco sous le nom
  const nw = Math.min(doc.getTextWidth(nameStr), W - 40);
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(1.5);
  doc.line(W / 2 - nw / 2, y, W / 2 + nw / 2, y);
  y += 10;

  // "a complete avec succes"
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("a complete avec succes le programme de formation", W / 2, y, { align: "center" });
  y += 12;

  // TITRE FORMATION — encadré coloré
  const titleBoxH = 14;
  doc.setFillColor(ar, ag, ab);
  doc.setGState(doc.GState({ opacity: 0.08 }));
  doc.roundedRect(mx, y - 4, W - mx * 2, titleBoxH, 3, 3, "F");
  doc.setGState(doc.GState({ opacity: 1 }));

  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(2.5);
  doc.line(mx, y - 4, mx, y + titleBoxH - 4);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(ar, ag, ab);
  doc.text(cert.courseTitle, W / 2, y + 5, { align: "center" });
  y += titleBoxH + 6;

  // META : date / duree / niveau
  const metaItems: { label: string; value: string }[] = [];
  if (cert.issueDate) metaItems.push({ label: "Date :", value: cert.issueDate });
  if (cert.duration)  metaItems.push({ label: "Duree :", value: cert.duration });
  if (cert.level)     metaItems.push({ label: "Niveau :", value: cert.level });

  const totalMetaW = metaItems.reduce((acc, m) => {
    doc.setFontSize(8); doc.setFont("helvetica", "normal");
    const lw = doc.getTextWidth(m.label);
    doc.setFont("helvetica", "bold");
    const vw = doc.getTextWidth(m.value);
    return acc + lw + vw + 4 + 16;
  }, 0);

  let mx2 = W / 2 - totalMetaW / 2;
  metaItems.forEach((m, i) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text(m.label, mx2, y);
    const lw = doc.getTextWidth(m.label);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 30, 30);
    doc.text(m.value, mx2 + lw + 2, y);
    const vw = doc.getTextWidth(m.value);
    mx2 += lw + vw + 2 + 14;

    if (i < metaItems.length - 1) {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.line(mx2 - 7, y - 3, mx2 - 7, y + 1);
    }
  });
  y += 10;

  // MENTION
  if (mention) {
    const mentionW = 70;
    doc.setFillColor(mention.r, mention.g, mention.b);
    doc.setGState(doc.GState({ opacity: 0.1 }));
    doc.roundedRect(W / 2 - mentionW / 2, y - 4, mentionW, 9, 4, 4, "F");
    doc.setGState(doc.GState({ opacity: 1 }));

    doc.setFillColor(mention.r, mention.g, mention.b);
    doc.rect(W / 2 - mentionW / 2 + 3, y - 2, 3, 3, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(mention.r, mention.g, mention.b);
    doc.text(mention.label, W / 2 + 2, y + 1.5, { align: "center" });
    y += 12;
  } else {
    y += 4;
  }

  // SEPARATEUR
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.4);
  doc.line(mx, y, W - mx, y);
  y += 8;

  // DESCRIPTION DE LA FORMATION (comme Coursera)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(ar, ag, ab);
  doc.text("A PROPOS DE CETTE FORMATION", mx, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  const descLines = doc.splitTextToSize(cfg.description, W - mx * 2);
  descLines.forEach((line: string) => {
    doc.text(line, mx, y);
    y += 5.5;
  });
  y += 4;

  // SEPARATEUR
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.4);
  doc.line(mx, y, W - mx, y);
  y += 8;

  // COMPETENCES VALIDEES
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(ar, ag, ab);
  doc.text("COMPETENCES VALIDEES", mx, y);
  y += 7;

  // 2 colonnes de compétences
  const colW2 = (W - mx * 2) / 2;
  const half = Math.ceil(cfg.skills.length / 2);
  cfg.skills.forEach((skill, i) => {
    const col = i < half ? 0 : 1;
    const row = i < half ? i : i - half;
    const sx = mx + col * colW2;
    const sy = y + row * 7;

    doc.setFillColor(ar, ag, ab);
    doc.circle(sx + 1.5, sy - 1.5, 1.2, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(40, 40, 40);
    doc.text(skill, sx + 6, sy - 0.5);
  });
  y += Math.ceil(cfg.skills.length / 2) * 7 + 4;

  // SEPARATEUR
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.4);
  doc.line(mx, y, W - mx, y);
  y += 8;

  // PROJET FINAL
  const projDesc = cert.projectDescription || cfg.description;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(ar, ag, ab);
  doc.text("PROJET FINAL", mx, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  const projLines = doc.splitTextToSize(projDesc, W - mx * 2);
  projLines.slice(0, 5).forEach((line: string) => {
    doc.text(line, mx, y);
    y += 5.5;
  });

  if (cert.projectUrl) {
    y += 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(ar, ag, ab);
    doc.text("Voir sur GitHub : " + cert.projectUrl, mx, y);
    y += 7;
  }

  // ─── 5. FOOTER : SIGNATURE + QR ──────────────────────────────────────────
  const footerY = H - 52;

  // Ligne séparation footer
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.5);
  doc.line(mx, footerY, W - mx, footerY);

  // ZONE SIGNATURE (gauche)
  const sigX = mx;
  const sigY = footerY + 6;

  const sigImg = await loadImage("/signature.png");
  if (sigImg) {
    doc.addImage(sigImg, "PNG", sigX, sigY, 45, 18);
  } else {
    doc.setFont("times", "italic");
    doc.setFontSize(20);
    doc.setTextColor(50, 50, 50);
    doc.setGState(doc.GState({ opacity: 0.25 }));
    doc.text("Medoune C.", sigX + 22, sigY + 14, { align: "center" });
    doc.setGState(doc.GState({ opacity: 1 }));
  }

  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.5);
  doc.line(sigX, sigY + 20, sigX + 50, sigY + 20);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(20, 20, 20);
  doc.text("Medoune Camara", sigX + 25, sigY + 26, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text("Economist & Business Analyst", sigX + 25, sigY + 32, { align: "center" });
  doc.text("Fondateur - ADN Academy", sigX + 25, sigY + 37, { align: "center" });

  // QR CODE (droite)
  const qrSize = 36;
  const qrX = W - mx - qrSize - 4;
  const qrY = footerY + 4;
  const verifyUrl = `https://medoune-business-analyst.vercel.app/verify/${cert.id}`;

  try {
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      width: 400, margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    });
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.4);
    doc.roundedRect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, 2, 2, "FD");
    doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);
  } catch (e) { console.error("QR:", e); }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(130, 130, 130);
  doc.text("Scannez pour verifier", qrX + qrSize / 2 + 2, qrY + qrSize + 5, { align: "center" });

  // ─── 6. PIED DE PAGE ──────────────────────────────────────────────────────
  doc.setFillColor(248, 249, 250);
  doc.rect(8, H - 16, W - 16, 8, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(150, 150, 150);
  doc.text(`ID : ${cert.id}`, mx, H - 11);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6);
  doc.setTextColor(ar, ag, ab);
  doc.text(
    `Verification : medoune-business-analyst.vercel.app/verify/${cert.id}`,
    W / 2, H - 11, { align: "center" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(150, 150, 150);
  doc.text("(c) 2026 ADN Academy - Yamoussoukro, CI", W - mx, H - 11, { align: "right" });

  // ─── 7. SAUVEGARDE ────────────────────────────────────────────────────────
  const safeName = cert.studentName.replace(/\s+/g, "_").toLowerCase();
  const safeCourse = cfg.shortName.replace(/\s+/g, "_").toLowerCase();
  doc.save(`certificat_${safeName}_${safeCourse}.pdf`);
}
