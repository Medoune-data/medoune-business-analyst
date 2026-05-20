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

const COURSE_CONFIG_LIST = [
  {
    pattern: /excel/i,
    accent: [16, 185, 129] as [number, number, number],
    shortName: "EXCEL PRO",
    label: "Data Analysis - Office",
    description:
      "Les participants ayant complete ce programme ont developpe des competences pratiques " +
      "pour nettoyer, analyser et visualiser des donnees avec Excel. Ils maitrisent la creation " +
      "de dashboards interactifs, les formules avancees et l'automatisation des rapports.",
    skills: [
      "Tableaux croises dynamiques",
      "Dashboards interactifs",
      "Formules avancees (INDEX/EQUIV, OFFSET)",
      "Transformation de donnees",
      "Visualisation & nettoyage de fichiers",
    ],
  },
  {
    pattern: /sql/i,
    accent: [59, 130, 246] as [number, number, number],
    shortName: "SQL MASTER",
    label: "Data Analysis - Database",
    description:
      "Les participants ayant complete ce programme maitrisent l'interrogation et la manipulation " +
      "de bases de donnees relationnelles. Ils sont competents dans l'ecriture de requetes complexes, " +
      "l'optimisation des performances et l'extraction de donnees pour l'analyse metier.",
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
    shortName: "R STRATEGY",
    label: "Data Science - Strategy",
    description:
      "Les participants ayant complete ce programme ont acquis des competences en modelisation " +
      "econometrique et en analyse predictive avec R. Ils savent preparer, analyser et visualiser " +
      "des donnees complexes pour orienter la strategie de revenus et la prise de decision.",
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
  "Excellence": { label: "MENTION EXCELLENCE", r: 217, g: 119, b: 6   },
  "Tres Bien":  { label: "MENTION TRES BIEN",  r: 16,  g: 185, b: 129 },
  "Bien":       { label: "MENTION BIEN",        r: 59,  g: 130, b: 246 },
  "Passable":   { label: "MENTION PASSABLE",    r: 107, g: 114, b: 128 },
};

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
  // ─── FORMAT PAYSAGE A4 ───────────────────────────────────────────────────
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297;
  const H = 210;
  const cfg = getCourseConfig(cert.courseTitle);
  const [ar, ag, ab] = cfg.accent;
  const mention = cert.mention ? (MENTION_CONFIG[cert.mention] ?? MENTION_CONFIG["Bien"]) : null;

  // ─── 1. FOND BLANC ────────────────────────────────────────────────────────
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, H, "F");

  // ─── 2. BORDURES ──────────────────────────────────────────────────────────
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(2);
  doc.rect(6, 6, W - 12, H - 12);

  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.35);
  doc.setGState(doc.GState({ opacity: 0.2 }));
  doc.rect(10, 10, W - 20, H - 20);
  doc.setGState(doc.GState({ opacity: 1 }));

  // ─── 3. HEADER ────────────────────────────────────────────────────────────
  doc.setFillColor(ar, ag, ab);
  doc.rect(6, 6, W - 12, 26, "F");

  // Charger logos
  const [logoEvalis, logoAdn] = await Promise.all([
    loadImage("/logo-evalis.png"),
    loadImage("/logo-adn.png"),
  ]);

  // Logo Evalis gauche — fond blanc arrondi derriere
  if (logoEvalis) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(12, 8, 26, 20, 2, 2, "F");
    doc.addImage(logoEvalis, "PNG", 12, 8, 26, 20);
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text("EVALIS CORP", 14, 21);
  }

  // Logo ADN droite — fond blanc arrondi derriere
  if (logoAdn) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(W - 42, 8, 34, 20, 2, 2, "F");
    doc.addImage(logoAdn, "PNG", W - 42, 8, 34, 20);
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text("ADN ACADEMY", W - 42, 21);
  }

  // Titre header centré
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("CERTIFICAT DE FORMATION PROFESSIONNELLE", W / 2, 18, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setGState(doc.GState({ opacity: 0.8 }));
  doc.text(cfg.label, W / 2, 25, { align: "center" });
  doc.setGState(doc.GState({ opacity: 1 }));

  // ─── 4. SÉPARATION DEUX COLONNES ──────────────────────────────────────────
  // Colonne gauche : contenu principal (0 → 195mm)
  // Colonne droite : signature + QR (195mm → 297mm)
  const divX = 196;

  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.3);
  doc.line(divX, 36, divX, H - 18);

  // ─── 5. COLONNE GAUCHE ────────────────────────────────────────────────────
  const lx = 16;
  let y = 42;

  // Label intro
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(160, 160, 160);
  doc.text("CE DOCUMENT OFFICIEL ATTESTE QUE", lx, y);
  y += 8;

  // Nom étudiant
  const nameStr = cert.studentName.toUpperCase();
  doc.setFont("times", "bold");
  let fs = 30;
  doc.setFontSize(fs);
  while (doc.getTextWidth(nameStr) > divX - lx - 8 && fs > 16) {
    fs -= 1;
    doc.setFontSize(fs);
  }
  doc.setTextColor(15, 15, 15);
  doc.text(nameStr, lx, y);
  y += 3;

  // Ligne sous le nom
  const nw = Math.min(doc.getTextWidth(nameStr), divX - lx - 8);
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(1.5);
  doc.line(lx, y, lx + nw, y);
  y += 8;

  // "a complete avec succes"
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 100);
  doc.text("a complete avec succes le programme de formation", lx, y);
  y += 8;

  // Titre formation
  const boxH = 11;
  doc.setFillColor(ar, ag, ab);
  doc.setGState(doc.GState({ opacity: 0.07 }));
  doc.roundedRect(lx - 2, y - 3, divX - lx - 10, boxH, 2, 2, "F");
  doc.setGState(doc.GState({ opacity: 1 }));
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(2.5);
  doc.line(lx - 2, y - 3, lx - 2, y + boxH - 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(ar, ag, ab);
  doc.text(cert.courseTitle, lx + 4, y + 4.5);
  y += boxH + 4;

  // Meta : date / duree / niveau
  const metaItems: { label: string; value: string }[] = [];
  if (cert.issueDate) metaItems.push({ label: "Date :", value: cert.issueDate });
  if (cert.duration)  metaItems.push({ label: "Duree :", value: cert.duration });
  if (cert.level)     metaItems.push({ label: "Niveau :", value: cert.level });

  let mx2 = lx;
  metaItems.forEach((m, i) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(130, 130, 130);
    doc.text(m.label, mx2, y);
    const lw = doc.getTextWidth(m.label);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(30, 30, 30);
    doc.text(m.value, mx2 + lw + 1.5, y);
    const vw = doc.getTextWidth(m.value);
    mx2 += lw + vw + 1.5 + 12;
    if (i < metaItems.length - 1) {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.line(mx2 - 6, y - 3, mx2 - 6, y + 1);
    }
  });
  y += 8;

  // Mention
  if (mention) {
    const mw = 60;
    doc.setFillColor(mention.r, mention.g, mention.b);
    doc.setGState(doc.GState({ opacity: 0.1 }));
    doc.roundedRect(lx - 2, y - 3.5, mw, 8, 4, 4, "F");
    doc.setGState(doc.GState({ opacity: 1 }));
    doc.setFillColor(mention.r, mention.g, mention.b);
    doc.rect(lx + 1, y - 2, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(mention.r, mention.g, mention.b);
    doc.text(mention.label, lx + 7, y + 1);
    y += 10;
  } else {
    y += 4;
  }

  // Séparateur
  doc.setDrawColor(235, 235, 235);
  doc.setLineWidth(0.3);
  doc.line(lx, y, divX - 10, y);
  y += 6;

  // A PROPOS (description auto)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(ar, ag, ab);
  doc.text("A PROPOS DE CETTE FORMATION", lx, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(70, 70, 70);
  const descLines = doc.splitTextToSize(cfg.description, divX - lx - 12);
  descLines.forEach((line: string) => { doc.text(line, lx, y); y += 5; });
  y += 3;

  // Séparateur
  doc.setDrawColor(235, 235, 235);
  doc.setLineWidth(0.3);
  doc.line(lx, y, divX - 10, y);
  y += 6;

  // COMPETENCES
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(ar, ag, ab);
  doc.text("COMPETENCES VALIDEES", lx, y);
  y += 5;

  const colW = (divX - lx - 12) / 2;
  const half = Math.ceil(cfg.skills.length / 2);
  cfg.skills.forEach((skill, i) => {
    const col = i < half ? 0 : 1;
    const row = i < half ? i : i - half;
    const sx = lx + col * colW;
    const sy = y + row * 6;
    doc.setFillColor(ar, ag, ab);
    doc.circle(sx + 1.2, sy - 1.2, 1, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(40, 40, 40);
    doc.text(skill, sx + 5, sy - 0.2);
  });
  y += Math.ceil(cfg.skills.length / 2) * 6 + 3;

  // PROJET FINAL (seulement si renseigne)
  if (cert.projectDescription && cert.projectDescription.trim().length > 0) {
    doc.setDrawColor(235, 235, 235);
    doc.setLineWidth(0.3);
    doc.line(lx, y, divX - 10, y);
    y += 6;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(ar, ag, ab);
    doc.text("PROJET FINAL", lx, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(70, 70, 70);
    const projLines = doc.splitTextToSize(cert.projectDescription, divX - lx - 12);
    projLines.slice(0, 4).forEach((line: string) => { doc.text(line, lx, y); y += 5; });
  }

  // ─── 6. COLONNE DROITE : SIGNATURE + QR ──────────────────────────────────
  const rx = divX + 8;
  const rw = W - divX - 14; // largeur dispo ~83mm
  let ry = 40;

  // SIGNATURE
  doc.setFillColor(250, 250, 250);
  doc.setDrawColor(240, 240, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(rx, ry, rw, 36, 2, 2, "FD");

  const sigImg = await loadImage("/signature.png");
  if (sigImg) {
    doc.addImage(sigImg, "PNG", rx + rw / 2 - 20, ry + 2, 40, 16);
  } else {
    doc.setFont("times", "italic");
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);
    doc.setGState(doc.GState({ opacity: 0.25 }));
    doc.text("Medoune C.", rx + rw / 2, ry + 14, { align: "center" });
    doc.setGState(doc.GState({ opacity: 1 }));
  }

  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.6);
  doc.line(rx + 8, ry + 22, rx + rw - 8, ry + 22);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(20, 20, 20);
  doc.text("Medoune Camara", rx + rw / 2, ry + 27, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(110, 110, 110);
  doc.text("Economist & Business Analyst", rx + rw / 2, ry + 32, { align: "center" });
  doc.text("Fondateur - ADN Academy", rx + rw / 2, ry + 37, { align: "center" });
  ry += 44;

  // QR CODE
  const qrSize = Math.min(rw - 10, 52);
  const qrX = rx + (rw - qrSize) / 2;
  const verifyUrl = `https://medoune-business-analyst.vercel.app/verify/${cert.id}`;

  try {
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      width: 500, margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    });
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.4);
    doc.roundedRect(qrX - 2, ry - 2, qrSize + 4, qrSize + 4, 2, 2, "FD");
    doc.addImage(qrDataUrl, "PNG", qrX, ry, qrSize, qrSize);
  } catch (e) { console.error("QR:", e); }

  ry += qrSize + 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(130, 130, 130);
  doc.text("Scannez pour verifier", rx + rw / 2, ry, { align: "center" });
  ry += 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(ar, ag, ab);
  doc.text("ADN Academy — Evalis Corp", rx + rw / 2, ry, { align: "center" });

  // ─── 7. PIED DE PAGE ──────────────────────────────────────────────────────
  doc.setFillColor(248, 249, 250);
  doc.rect(6, H - 16, W - 12, 10, "F");

  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(16, H - 16, W - 16, H - 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(150, 150, 150);
  doc.text(`ID : ${cert.id}`, 16, H - 10);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6);
  doc.setTextColor(ar, ag, ab);
  doc.text(
    `Verification : medoune-business-analyst.vercel.app/verify/${cert.id}`,
    W / 2, H - 10, { align: "center" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(150, 150, 150);
  doc.text("© 2026 ADN Academy - Yamoussoukro, CI", W - 16, H - 10, { align: "right" });

  // ─── 8. SAUVEGARDE ────────────────────────────────────────────────────────
  const safeName = cert.studentName.replace(/\s+/g, "_").toLowerCase();
  const safeCourse = cfg.shortName.replace(/\s+/g, "_").toLowerCase();
  doc.save(`certificat_${safeName}_${safeCourse}.pdf`);
}
