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

const COURSE_CONFIG: Record<string, {
  accent: [number, number, number];
  skills: string[];
  shortName: string;
}> = {
  "Excel pour l'Analyse de Donnees": {
    accent: [16, 185, 129],
    shortName: "EXCEL PRO",
    skills: [
      "Tableaux croises dynamiques",
      "Dashboards interactifs",
      "Formules avancees (INDEX/EQUIV, OFFSET)",
      "Transformation de donnees",
      "Visualisation & nettoyage de fichiers",
    ],
  },
  "Maitrise de SQL pour le Business": {
    accent: [59, 130, 246],
    shortName: "SQL MASTER",
    skills: [
      "Requetes complexes (JOIN, CTE, Subqueries)",
      "Window Functions (RANK, LAG, ROW_NUMBER)",
      "Optimisation de requetes & index",
      "Gestion de bases de donnees relationnelles",
      "Extraction & transformation de donnees",
    ],
  },
  "Data Science & Strategie avec R": {
    accent: [139, 92, 246],
    shortName: "R STRATEGY",
    skills: [
      "Modelisation econometrique",
      "Analyse de regression (OLS, Logit)",
      "Visualisation avancee (ggplot2)",
      "Nettoyage de donnees (dplyr / tidyr)",
      "Segmentation RFM & clustering",
    ],
  },
};

const MENTION_LABELS: Record<string, string> = {
  "Excellence": "MENTION EXCELLENCE",
  "Tres Bien":  "MENTION TRES BIEN",
  "Tres Bien":  "MENTION TRES BIEN",
  "Bien":       "MENTION BIEN",
  "Passable":   "MENTION PASSABLE",
};

export async function generateCertificatePDF(cert: CertificateData): Promise<void> {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const W = 297;
  const H = 210;
  const cfg = COURSE_CONFIG[cert.courseTitle] ?? COURSE_CONFIG["Excel pour l'Analyse de Donnees"];
  const [ar, ag, ab] = cfg.accent;

  // ────────────────────────────────────────────────────────────────────────────
  // 1. FOND BLANC TOTAL
  // ────────────────────────────────────────────────────────────────────────────
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, H, "F");

  // ────────────────────────────────────────────────────────────────────────────
  // 2. BORDURE EXTERIEURE ELEGANTE
  // ────────────────────────────────────────────────────────────────────────────
  // Bordure principale
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(1.5);
  doc.rect(8, 8, W - 16, H - 16);

  // Bordure interieure fine
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.3);
  doc.setGState(doc.GState({ opacity: 0.3 }));
  doc.rect(11, 11, W - 22, H - 22);
  doc.setGState(doc.GState({ opacity: 1 }));

  // ────────────────────────────────────────────────────────────────────────────
  // 3. BANDE HEADER (couleur accent)
  // ────────────────────────────────────────────────────────────────────────────
  doc.setFillColor(ar, ag, ab);
  doc.rect(8, 8, W - 16, 24, "F");

  // Nom organisme (blanc sur fond colore)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("EVALIS CORP", 18, 22);

  // Separateur vertical header
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.4);
  doc.setGState(doc.GState({ opacity: 0.4 }));
  doc.line(70, 14, 70, 28);
  doc.setGState(doc.GState({ opacity: 1 }));

  // Sous-titre header
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.85 }));
  doc.text("Formation Professionnelle Certifiante", 75, 22);
  doc.setGState(doc.GState({ opacity: 1 }));

  // Formation shortname (droite du header)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(cfg.shortName, W - 18, 22, { align: "right" });

  // ────────────────────────────────────────────────────────────────────────────
  // 4. ZONE CONTENU PRINCIPALE
  // ────────────────────────────────────────────────────────────────────────────
  // Separation visuelle : colonne gauche (190mm) | colonne droite (75mm)
  const divX = 200;

  // Ligne de separation verticale entre les deux colonnes
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.3);
  doc.line(divX, 38, divX, H - 22);

  // ── COLONNE GAUCHE ──────────────────────────────────────────────────────────
  let y = 46;
  const lx = 18;

  // Label discret
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(160, 160, 160);
  doc.text("CE DOCUMENT OFFICIEL ATTESTE QUE", lx, y);
  y += 9;

  // NOM ETUDIANT
  doc.setFont("times", "bold");
  doc.setFontSize(34);
  doc.setTextColor(15, 15, 15);
  // Reduire si nom trop long
  const nameStr = cert.studentName.toUpperCase();
  const maxW = divX - lx - 10;
  let nameFontSize = 34;
  while (doc.getTextWidth(nameStr) > maxW && nameFontSize > 18) {
    nameFontSize -= 1;
    doc.setFontSize(nameFontSize);
  }
  doc.text(nameStr, lx, y);

  // Ligne decorative sous le nom
  const nw = Math.min(doc.getTextWidth(nameStr), maxW);
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(1.8);
  doc.line(lx, y + 3, lx + nw, y + 3);
  y += 12;

  // Texte "a complete avec succes"
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("a complete avec succes le programme de formation", lx, y);
  y += 9;

  // TITRE FORMATION - fond colore
  doc.setFillColor(ar, ag, ab);
  doc.setGState(doc.GState({ opacity: 0.07 }));
  doc.roundedRect(lx - 2, y - 5, divX - lx - 14, 12, 2, 2, "F");
  doc.setGState(doc.GState({ opacity: 1 }));

  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(2);
  doc.line(lx - 2, y - 5, lx - 2, y + 7);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(ar, ag, ab);
  doc.text(cert.courseTitle, lx + 4, y + 3);
  y += 14;

  // META : date / duree / niveau - SANS EMOJIS
  const metaParts: { label: string; value: string }[] = [];
  if (cert.issueDate) metaParts.push({ label: "Date", value: cert.issueDate });
  if (cert.duration)  metaParts.push({ label: "Duree", value: cert.duration });
  if (cert.level)     metaParts.push({ label: "Niveau", value: cert.level });

  // Affichage meta propre : label gris + valeur noire
  let metaX = lx;
  metaParts.forEach((m, i) => {
    // Label
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text(m.label + " :", metaX, y);
    const labelW = doc.getTextWidth(m.label + " :");

    // Valeur
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(40, 40, 40);
    doc.text(m.value, metaX + labelW + 1.5, y);
    const valW = doc.getTextWidth(m.value);

    metaX += labelW + valW + 10;

    // Separateur entre les metas (sauf dernier)
    if (i < metaParts.length - 1) {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.line(metaX - 5, y - 3, metaX - 5, y + 1);
    }
  });
  y += 9;

  // MENTION - SANS EMOJI
  if (cert.mention && MENTION_LABELS[cert.mention]) {
    doc.setFillColor(ar, ag, ab);
    doc.setGState(doc.GState({ opacity: 0.1 }));
    doc.roundedRect(lx - 2, y - 4, 58, 8, 4, 4, "F");
    doc.setGState(doc.GState({ opacity: 1 }));

    // Petit carre decoratif a la place de l'emoji
    doc.setFillColor(ar, ag, ab);
    doc.rect(lx + 1, y - 2.5, 3, 3, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(ar, ag, ab);
    doc.text(MENTION_LABELS[cert.mention], lx + 7, y + 1.5);
    y += 12;
  } else {
    y += 4;
  }

  // Separateur
  doc.setDrawColor(235, 235, 235);
  doc.setLineWidth(0.4);
  doc.line(lx, y, divX - 14, y);
  y += 8;

  // COMPETENCES VALIDEES
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(ar, ag, ab);
  doc.text("COMPETENCES VALIDEES", lx, y);
  y += 6;

  // Disposition en 2 colonnes
  const colW = (divX - lx - 14) / 2;
  const half = Math.ceil(cfg.skills.length / 2);

  cfg.skills.forEach((skill, i) => {
    const col = i < half ? 0 : 1;
    const row = i < half ? i : i - half;
    const sx = lx + col * colW;
    const sy = y + row * 6.5;

    // Puce
    doc.setFillColor(ar, ag, ab);
    doc.circle(sx + 1.2, sy - 1.5, 1, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(50, 50, 50);
    doc.text(skill, sx + 5, sy - 0.5);
  });

  // ── COLONNE DROITE ──────────────────────────────────────────────────────────
  const rx = divX + 8;
  let ry = 42;

  // ── SIGNATURE ─────────────────────────────────────────────────────────────
  // Zone signature
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(rx, ry, 72, 38, 2, 2, "F");

  // Charger signature si disponible
  try {
    const sigImg = new Image();
    sigImg.crossOrigin = "anonymous";
    sigImg.src = "/signature.png";
    await new Promise<void>((resolve) => {
      sigImg.onload = () => resolve();
      sigImg.onerror = () => resolve();
      setTimeout(resolve, 1500);
    });
    if (sigImg.complete && sigImg.naturalWidth > 0) {
      doc.addImage(sigImg, "PNG", rx + 16, ry + 4, 40, 18);
    } else {
      // Placeholder signature si pas de fichier
      doc.setFont("times", "italic");
      doc.setFontSize(18);
      doc.setTextColor(50, 50, 50);
      doc.setGState(doc.GState({ opacity: 0.3 }));
      doc.text("Medoune C.", rx + 36, ry + 18, { align: "center" });
      doc.setGState(doc.GState({ opacity: 1 }));
    }
  } catch (_) {}

  // Ligne signature
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.6);
  doc.line(rx + 8, ry + 26, rx + 64, ry + 26);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(20, 20, 20);
  doc.text("Medoune Camara", rx + 36, ry + 31, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(120, 120, 120);
  doc.text("Economist & Business Analyst", rx + 36, ry + 36, { align: "center" });

  ry += 46;

  // ── QR CODE ────────────────────────────────────────────────────────────────
  const verifyUrl = `https://medoune-business-analyst.vercel.app/verify/${cert.id}`;
  const qrSize = 42;

  try {
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      width: 400,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    });

    // Fond blanc propre avec bordure fine
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.4);
    doc.roundedRect(rx + 15, ry, qrSize + 4, qrSize + 4, 2, 2, "FD");

    doc.addImage(qrDataUrl, "PNG", rx + 17, ry + 2, qrSize, qrSize);
  } catch (e) {
    console.error("QR error:", e);
  }

  ry += qrSize + 8;

  // Label scanner
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(130, 130, 130);
  doc.text("Scannez pour verifier l'authenticitee", rx + 36, ry, { align: "center" });

  ry += 6;

  // Fondateur
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(ar, ag, ab);
  doc.text("Fondateur - Evalis Corp", rx + 36, ry, { align: "center" });

  // Projet final (si dispo et place)
  if (cert.projectDescription) {
    ry += 8;
    if (ry < H - 28) {
      doc.setDrawColor(235, 235, 235);
      doc.setLineWidth(0.3);
      doc.line(rx, ry, rx + 72, ry);
      ry += 5;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(ar, ag, ab);
      doc.text("PROJET FINAL", rx, ry);
      ry += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(80, 80, 80);
      const plines = doc.splitTextToSize(cert.projectDescription, 72);
      plines.slice(0, 3).forEach((line: string, i: number) => {
        doc.text(line, rx, ry + i * 5);
      });
    }
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 5. FOOTER
  // ────────────────────────────────────────────────────────────────────────────
  doc.setFillColor(248, 249, 250);
  doc.rect(8, H - 22, W - 16, 14, "F");

  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(18, H - 22, W - 18, H - 22);

  // ID (gauche)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(150, 150, 150);
  doc.text(`ID Unique : ${cert.id}`, 18, H - 13);

  // URL verification (centre)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(ar, ag, ab);
  doc.text(
    `Verification : medoune-business-analyst.vercel.app/verify/${cert.id}`,
    W / 2, H - 13, { align: "center" }
  );

  // Copyright (droite)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(150, 150, 150);
  doc.text("(c) 2026 Evalis Corp - Yamoussoukro, CI", W - 18, H - 13, { align: "right" });

  // ────────────────────────────────────────────────────────────────────────────
  // 6. SAUVEGARDE
  // ────────────────────────────────────────────────────────────────────────────
  const safeName = cert.studentName.replace(/\s+/g, "_").toLowerCase();
  const safeCourse = cfg.shortName.replace(/\s+/g, "_").toLowerCase();
  doc.save(`certificat_${safeName}_${safeCourse}.pdf`);
}
