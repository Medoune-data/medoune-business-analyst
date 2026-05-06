import { jsPDF } from "jspdf";
import QRCode from "qrcode";

// ─── TYPES ───────────────────────────────────────────────────────────────────
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

// ─── COULEURS PAR FORMATION ──────────────────────────────────────────────────
const COURSE_CONFIG: Record<string, {
  accent: [number, number, number];
  accentLight: [number, number, number];
  label: string;
  skills: string[];
}> = {
  "Excel pour l'Analyse de Données": {
    accent: [16, 185, 129],
    accentLight: [6, 60, 42],
    label: "DATA ANALYSIS — OFFICE",
    skills: [
      "Tableaux croisés dynamiques",
      "Dashboards interactifs",
      "Formules avancées (INDEX/EQUIV, OFFSET)",
      "Power Query & transformation de données",
      "Visualisation & nettoyage de fichiers",
    ],
  },
  "Maîtrise de SQL pour le Business": {
    accent: [96, 165, 250],
    accentLight: [12, 68, 124],
    label: "DATA ANALYSIS — DATABASE",
    skills: [
      "Requêtes complexes (JOIN, CTE, Subqueries)",
      "Agrégations & fenêtrage (WINDOW FUNCTIONS)",
      "Optimisation de requêtes & index",
      "Gestion de bases de données relationnelles",
      "Extraction & transformation de données",
    ],
  },
  "Data Science & Stratégie avec R": {
    accent: [167, 139, 250],
    accentLight: [60, 52, 137],
    label: "DATA SCIENCE — STRATEGY",
    skills: [
      "Modélisation économétrique",
      "Analyse de régression (OLS, Logit)",
      "Visualisation avancée (ggplot2)",
      "Nettoyage de données (dplyr / tidyr)",
      "Segmentation RFM & clustering",
    ],
  },
};

const MENTION_LABELS: Record<string, string> = {
  "Excellence": "🏅 Mention Excellence",
  "Très Bien": "🏅 Mention Très Bien",
  "Bien": "Mention Bien",
  "Passable": "Mention Passable",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function hexToRgb(r: number, g: number, b: number) {
  return { r, g, b };
}

function drawRoundedRect(
  doc: jsPDF,
  x: number, y: number,
  w: number, h: number,
  radius: number
) {
  doc.roundedRect(x, y, w, h, radius, radius, "F");
}

// ─── GÉNÉRATEUR PRINCIPAL ────────────────────────────────────────────────────
export async function generateCertificatePDF(cert: CertificateData): Promise<void> {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const W = 297; // largeur A4 paysage
  const H = 210; // hauteur A4 paysage

  const course = COURSE_CONFIG[cert.courseTitle] || COURSE_CONFIG["Excel pour l'Analyse de Données"];
  const [ar, ag, ab] = course.accent;
  const [alr, alg, alb] = course.accentLight;

  // ── 1. FOND NOIR ────────────────────────────────────────────────────────
  doc.setFillColor(7, 7, 14);
  doc.rect(0, 0, W, H, "F");

  // ── 2. GRILLE SUBTILE ───────────────────────────────────────────────────
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.05);
  doc.setGState(doc.GState({ opacity: 0.04 }));
  for (let x = 0; x <= W; x += 12) doc.line(x, 0, x, H);
  for (let y = 0; y <= H; y += 12) doc.line(0, y, W, y);
  doc.setGState(doc.GState({ opacity: 1 }));

  // ── 3. BORDURE ACCENT ───────────────────────────────────────────────────
  // Bordure extérieure fine
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.3);
  doc.setGState(doc.GState({ opacity: 0.4 }));
  doc.rect(6, 6, W - 12, H - 12);
  doc.setGState(doc.GState({ opacity: 1 }));

  // Bordure intérieure encore plus fine
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.1);
  doc.setGState(doc.GState({ opacity: 0.15 }));
  doc.rect(8, 8, W - 16, H - 16);
  doc.setGState(doc.GState({ opacity: 1 }));

  // ── 4. BANDE LATÉRALE GAUCHE ────────────────────────────────────────────
  doc.setFillColor(ar, ag, ab);
  doc.setGState(doc.GState({ opacity: 0.06 }));
  doc.rect(0, 0, 22, H, "F");
  doc.setGState(doc.GState({ opacity: 1 }));

  // Ligne accent gauche
  doc.setFillColor(ar, ag, ab);
  doc.rect(0, 0, 3, H, "F");

  // ── 5. EN-TÊTE ──────────────────────────────────────────────────────────
  // Logo / nom organisme
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(ar, ag, ab);
  doc.text("EVALIS CORP", 30, 20);

  // Séparateur
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.1);
  doc.setGState(doc.GState({ opacity: 0.08 }));
  doc.line(30, 23, W - 14, 23);
  doc.setGState(doc.GState({ opacity: 1 }));

  // Label de formation (haut droite)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(ar, ag, ab);
  doc.text(course.label, W - 14, 20, { align: "right" });

  // ── 6. WATERMARK "VERIFIED" ─────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(72);
  doc.setTextColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.022 }));
  doc.text("VERIFIED", W / 2, H / 2 + 18, { align: "center" });
  doc.setGState(doc.GState({ opacity: 1 }));

  // ── 7. BADGE "CERTIFICAT AUTHENTIFIÉ" ───────────────────────────────────
  doc.setFillColor(ar, ag, ab);
  doc.setGState(doc.GState({ opacity: 0.12 }));
  drawRoundedRect(doc, W / 2 - 42, 28, 84, 8, 4);
  doc.setGState(doc.GState({ opacity: 1 }));

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(ar, ag, ab);
  doc.text("● CERTIFICAT AUTHENTIFIÉ ●", W / 2, 33.5, { align: "center" });

  // ── 8. TEXTE INTRO ──────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(160, 160, 160);
  doc.text("Ce document officiel atteste que l'étudiant(e)", W / 2, 46, { align: "center" });

  // ── 9. NOM DE L'ÉTUDIANT ────────────────────────────────────────────────
  doc.setFont("times", "bold");
  doc.setFontSize(36);
  doc.setTextColor(255, 255, 255);
  const nameUpper = cert.studentName.toUpperCase();
  doc.text(nameUpper, W / 2, 64, { align: "center" });

  // Ligne décorative sous le nom
  const nameWidth = Math.min(doc.getTextWidth(nameUpper), 160);
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.4);
  doc.setGState(doc.GState({ opacity: 0.5 }));
  doc.line(W / 2 - nameWidth / 2, 67, W / 2 + nameWidth / 2, 67);
  doc.setGState(doc.GState({ opacity: 1 }));

  // ── 10. TEXTE "A COMPLÉTÉ" ──────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(130, 130, 130);
  doc.text("a complété avec succès le programme de formation", W / 2, 75, { align: "center" });

  // ── 11. TITRE DE LA FORMATION ───────────────────────────────────────────
  doc.setFillColor(ar, ag, ab);
  doc.setGState(doc.GState({ opacity: 0.1 }));
  drawRoundedRect(doc, W / 2 - 65, 79, 130, 11, 5);
  doc.setGState(doc.GState({ opacity: 1 }));

  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.3);
  doc.setGState(doc.GState({ opacity: 0.4 }));
  doc.roundedRect(W / 2 - 65, 79, 130, 11, 5, 5);
  doc.setGState(doc.GState({ opacity: 1 }));

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(ar, ag, ab);
  doc.text(cert.courseTitle, W / 2, 86.5, { align: "center" });

  // ── 12. META (DATE / DURÉE / NIVEAU) ────────────────────────────────────
  const metas = [
    `Délivré le : ${cert.issueDate}`,
    cert.duration ? cert.duration : null,
    cert.level ? `Niveau : ${cert.level}` : null,
  ].filter(Boolean) as string[];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(80, 80, 80);
  doc.text(metas.join("   |   "), W / 2, 96, { align: "center" });

  // ── 13. MENTION ─────────────────────────────────────────────────────────
  if (cert.mention && MENTION_LABELS[cert.mention]) {
    doc.setFillColor(ar, ag, ab);
    doc.setGState(doc.GState({ opacity: 0.08 }));
    drawRoundedRect(doc, W / 2 - 30, 100, 60, 8, 4);
    doc.setGState(doc.GState({ opacity: 1 }));

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(ar, ag, ab);
    doc.text(MENTION_LABELS[cert.mention], W / 2, 105.5, { align: "center" });
  }

  // ── 14. LIGNE SÉPARATRICE ───────────────────────────────────────────────
  const sepY = cert.mention ? 113 : 105;
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.1);
  doc.setGState(doc.GState({ opacity: 0.06 }));
  doc.line(30, sepY, W - 14, sepY);
  doc.setGState(doc.GState({ opacity: 1 }));

  // ── 15. SECTION COMPÉTENCES (colonne gauche) ────────────────────────────
  const colStartY = sepY + 8;
  const colLeftX = 30;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(ar, ag, ab);
  doc.text("COMPÉTENCES VALIDÉES", colLeftX, colStartY);

  course.skills.forEach((skill, i) => {
    const sy = colStartY + 7 + i * 7;
    // Puce
    doc.setFillColor(ar, ag, ab);
    doc.circle(colLeftX + 1, sy - 1.2, 0.8, "F");
    // Texte
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(200, 200, 200);
    doc.text(skill, colLeftX + 5, sy);
  });

  // ── 16. SECTION PROJET (colonne centre) ─────────────────────────────────
  if (cert.projectDescription) {
    const projX = 115;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(ar, ag, ab);
    doc.text("PROJET FINAL", projX, colStartY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(180, 180, 180);
    const lines = doc.splitTextToSize(cert.projectDescription, 65);
    lines.slice(0, 6).forEach((line: string, i: number) => {
      doc.text(line, projX, colStartY + 7 + i * 6);
    });

    if (cert.projectUrl) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(ar, ag, ab);
      doc.text("↗ Voir sur GitHub", projX, colStartY + 52);
    }
  }

  // ── 17. QR CODE (colonne droite) ────────────────────────────────────────
  const verifyUrl = `https://medoune-business-analyst.vercel.app/verify/${cert.id}`;
  const qrX = 220;
  const qrY = colStartY - 2;
  const qrSize = 35;

  try {
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      width: 200,
      margin: 1,
      color: {
        dark: `#${ar.toString(16).padStart(2, "0")}${ag.toString(16).padStart(2, "0")}${ab.toString(16).padStart(2, "0")}`,
        light: "#07070e",
      },
    });
    // Fond QR
    doc.setFillColor(alr, alg, alb);
    doc.setGState(doc.GState({ opacity: 0.3 }));
    drawRoundedRect(doc, qrX - 3, qrY - 3, qrSize + 6, qrSize + 6, 4);
    doc.setGState(doc.GState({ opacity: 1 }));

    doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);
  } catch (e) {
    console.error("QR Code generation failed:", e);
  }

  // Label QR
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(80, 80, 80);
  doc.text("Scanner pour vérifier", qrX + qrSize / 2, qrY + qrSize + 5, { align: "center" });

  // ── 18. SIGNATURE ───────────────────────────────────────────────────────
  const sigX = 195;
  const sigY = colStartY;

  // Essai de chargement de la signature
  try {
    const sigImg = new Image();
    sigImg.src = "/signature.png";
    await new Promise((resolve) => {
      sigImg.onload = resolve;
      sigImg.onerror = resolve;
      setTimeout(resolve, 1000);
    });
    if (sigImg.complete && sigImg.naturalWidth > 0) {
      doc.addImage(sigImg, "PNG", sigX, sigY, 22, 12);
    }
  } catch (_) {}

  // Ligne signature
  doc.setDrawColor(ar, ag, ab);
  doc.setLineWidth(0.3);
  doc.setGState(doc.GState({ opacity: 0.4 }));
  doc.line(sigX - 2, sigY + 14, sigX + 24, sigY + 14);
  doc.setGState(doc.GState({ opacity: 1 }));

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(220, 220, 220);
  doc.text("Medoune Camara", sigX + 11, sigY + 19, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(80, 80, 80);
  doc.text("Economist & Business Analyst", sigX + 11, sigY + 24, { align: "center" });
  doc.text("Fondateur, Evalis Corp", sigX + 11, sigY + 29, { align: "center" });

  // ── 19. PIED DE PAGE ────────────────────────────────────────────────────
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.1);
  doc.setGState(doc.GState({ opacity: 0.06 }));
  doc.line(30, H - 16, W - 14, H - 16);
  doc.setGState(doc.GState({ opacity: 1 }));

  // ID unique
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(50, 50, 50);
  doc.text(`ID : ${cert.id}`, 30, H - 11);

  // URL de vérification
  doc.setTextColor(ar, ag, ab);
  doc.text(`Vérifier : medoune-business-analyst.vercel.app/verify/${cert.id}`, W / 2, H - 11, { align: "center" });

  // Année
  doc.setTextColor(50, 50, 50);
  doc.text("© 2026 Evalis Corp — Yamoussoukro, Côte d'Ivoire", W - 14, H - 11, { align: "right" });

  // ── 20. SAUVEGARDE ──────────────────────────────────────────────────────
  const filename = `certificat_${cert.studentName.replace(/\s+/g, "_").toLowerCase()}_${cert.courseTitle.split(" ")[0].toLowerCase()}.pdf`;
  doc.save(filename);
}
