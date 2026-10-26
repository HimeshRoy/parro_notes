export declare const NoteResourceType: {
    readonly PDF: 'PDF';
    readonly DOCUMENT: 'DOCUMENT';
    readonly PRESENTATION: 'PRESENTATION';
    readonly IMAGE: 'IMAGE';
    readonly VIDEO: 'VIDEO';
    readonly EXTERNAL_LINK: 'EXTERNAL_LINK';
};
export type NoteResourceType = (typeof NoteResourceType)[keyof typeof NoteResourceType];
export declare const NoteRequestStatus: {
    readonly PENDING: 'PENDING';
    readonly IN_PROGRESS: 'IN_PROGRESS';
    readonly COMPLETED: 'COMPLETED';
    readonly REJECTED: 'REJECTED';
};
export type NoteRequestStatus = (typeof NoteRequestStatus)[keyof typeof NoteRequestStatus];
