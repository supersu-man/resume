pdfjsLib.GlobalWorkerOptions.workerSrc = "//mozilla.github.io/pdf.js/build/pdf.worker.js";
const DEFAULT_URL = "/resume.pdf";
const container = document.getElementById("viewerContainer");
const eventBus = new pdfjsViewer.EventBus();

const pdfLinkService = new pdfjsViewer.PDFLinkService({ eventBus });

const pdfViewer = new pdfjsViewer.PDFViewer({
    container,
    eventBus,
    linkService: pdfLinkService
});
pdfLinkService.setViewer(pdfViewer);
eventBus.on("pagesinit", () => { pdfViewer.currentScaleValue = "page-width"; });

const loadingTask = pdfjsLib.getDocument({ url: DEFAULT_URL });
(async () => {
    const pdfDocument = await loadingTask.promise;
    pdfViewer.setDocument(pdfDocument);
    pdfLinkService.setDocument(pdfDocument, null);
})();