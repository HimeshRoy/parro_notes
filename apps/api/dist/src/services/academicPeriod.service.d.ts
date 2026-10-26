export declare function createAcademicPeriod(name: string, slug: string, programId: string, description?: string): Promise<any>;
export declare function getAcademicPeriods(): Promise<any>;
export declare function getAcademicPeriodById(id: string): Promise<any>;
export declare function updateAcademicPeriod(id: string, name: string, slug: string, programId: string, description?: string): Promise<any>;
export declare function deleteAcademicPeriod(id: string): Promise<any>;
export declare function programExists(id: string): Promise<boolean>;
