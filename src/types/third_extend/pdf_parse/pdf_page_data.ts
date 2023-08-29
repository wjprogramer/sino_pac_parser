export type PdfPageData = {
    pageIndex: number,
    pageInfo: {
        rotate: number,
        ref: { num: number, gen: number },
        userUnit: number,
        view: number[],
    },
    transport: {
        messageHandler: {
            sourceName: string,
            targetName: string,
            on: any,
        },
        numPages: number,
        pdfDocument: {
            pdfInfo: {
                numPages: number,
                fingerprint: string,
                encrypted: boolean,
            },
        },
    },
    stats: any,
    commonObjs: {
        objs: any,
    },
    objs: {
        objs: any
    },
    cleanupAfterRender: any,
    pendingCleanup: any,
    intentStates: any,
    destroyed: any,
    annotationsPromise: any,
}