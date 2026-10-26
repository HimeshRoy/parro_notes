import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model AcademicPeriod
 *
 */
export type AcademicPeriodModel = runtime.Types.Result.DefaultSelection<Prisma.$AcademicPeriodPayload>;
export type AggregateAcademicPeriod = {
    _count: AcademicPeriodCountAggregateOutputType | null;
    _min: AcademicPeriodMinAggregateOutputType | null;
    _max: AcademicPeriodMaxAggregateOutputType | null;
};
export type AcademicPeriodMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    description: string | null;
    programId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AcademicPeriodMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    description: string | null;
    programId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AcademicPeriodCountAggregateOutputType = {
    id: number;
    name: number;
    slug: number;
    description: number;
    programId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AcademicPeriodMinAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    programId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AcademicPeriodMaxAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    programId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AcademicPeriodCountAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    programId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AcademicPeriodAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicPeriod to aggregate.
     */
    where?: Prisma.AcademicPeriodWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AcademicPeriods to fetch.
     */
    orderBy?: Prisma.AcademicPeriodOrderByWithRelationInput | Prisma.AcademicPeriodOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AcademicPeriodWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AcademicPeriods from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AcademicPeriods.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AcademicPeriods
    **/
    _count?: true | AcademicPeriodCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AcademicPeriodMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AcademicPeriodMaxAggregateInputType;
};
export type GetAcademicPeriodAggregateType<T extends AcademicPeriodAggregateArgs> = {
    [P in keyof T & keyof AggregateAcademicPeriod]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAcademicPeriod[P]> : Prisma.GetScalarType<T[P], AggregateAcademicPeriod[P]>;
};
export type AcademicPeriodGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AcademicPeriodWhereInput;
    orderBy?: Prisma.AcademicPeriodOrderByWithAggregationInput | Prisma.AcademicPeriodOrderByWithAggregationInput[];
    by: Prisma.AcademicPeriodScalarFieldEnum[] | Prisma.AcademicPeriodScalarFieldEnum;
    having?: Prisma.AcademicPeriodScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AcademicPeriodCountAggregateInputType | true;
    _min?: AcademicPeriodMinAggregateInputType;
    _max?: AcademicPeriodMaxAggregateInputType;
};
export type AcademicPeriodGroupByOutputType = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    programId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: AcademicPeriodCountAggregateOutputType | null;
    _min: AcademicPeriodMinAggregateOutputType | null;
    _max: AcademicPeriodMaxAggregateOutputType | null;
};
export type GetAcademicPeriodGroupByPayload<T extends AcademicPeriodGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AcademicPeriodGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AcademicPeriodGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AcademicPeriodGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AcademicPeriodGroupByOutputType[P]>;
}>>;
export type AcademicPeriodWhereInput = {
    AND?: Prisma.AcademicPeriodWhereInput | Prisma.AcademicPeriodWhereInput[];
    OR?: Prisma.AcademicPeriodWhereInput[];
    NOT?: Prisma.AcademicPeriodWhereInput | Prisma.AcademicPeriodWhereInput[];
    id?: Prisma.StringFilter<"AcademicPeriod"> | string;
    name?: Prisma.StringFilter<"AcademicPeriod"> | string;
    slug?: Prisma.StringFilter<"AcademicPeriod"> | string;
    description?: Prisma.StringNullableFilter<"AcademicPeriod"> | string | null;
    programId?: Prisma.StringFilter<"AcademicPeriod"> | string;
    createdAt?: Prisma.DateTimeFilter<"AcademicPeriod"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AcademicPeriod"> | Date | string;
    program?: Prisma.XOR<Prisma.ProgramScalarRelationFilter, Prisma.ProgramWhereInput>;
    subjects?: Prisma.SubjectListRelationFilter;
    noteRequests?: Prisma.NoteRequestListRelationFilter;
};
export type AcademicPeriodOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    program?: Prisma.ProgramOrderByWithRelationInput;
    subjects?: Prisma.SubjectOrderByRelationAggregateInput;
    noteRequests?: Prisma.NoteRequestOrderByRelationAggregateInput;
};
export type AcademicPeriodWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    programId_name?: Prisma.AcademicPeriodProgramIdNameCompoundUniqueInput;
    programId_slug?: Prisma.AcademicPeriodProgramIdSlugCompoundUniqueInput;
    AND?: Prisma.AcademicPeriodWhereInput | Prisma.AcademicPeriodWhereInput[];
    OR?: Prisma.AcademicPeriodWhereInput[];
    NOT?: Prisma.AcademicPeriodWhereInput | Prisma.AcademicPeriodWhereInput[];
    name?: Prisma.StringFilter<"AcademicPeriod"> | string;
    slug?: Prisma.StringFilter<"AcademicPeriod"> | string;
    description?: Prisma.StringNullableFilter<"AcademicPeriod"> | string | null;
    programId?: Prisma.StringFilter<"AcademicPeriod"> | string;
    createdAt?: Prisma.DateTimeFilter<"AcademicPeriod"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AcademicPeriod"> | Date | string;
    program?: Prisma.XOR<Prisma.ProgramScalarRelationFilter, Prisma.ProgramWhereInput>;
    subjects?: Prisma.SubjectListRelationFilter;
    noteRequests?: Prisma.NoteRequestListRelationFilter;
}, "id" | "programId_name" | "programId_slug">;
export type AcademicPeriodOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AcademicPeriodCountOrderByAggregateInput;
    _max?: Prisma.AcademicPeriodMaxOrderByAggregateInput;
    _min?: Prisma.AcademicPeriodMinOrderByAggregateInput;
};
export type AcademicPeriodScalarWhereWithAggregatesInput = {
    AND?: Prisma.AcademicPeriodScalarWhereWithAggregatesInput | Prisma.AcademicPeriodScalarWhereWithAggregatesInput[];
    OR?: Prisma.AcademicPeriodScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AcademicPeriodScalarWhereWithAggregatesInput | Prisma.AcademicPeriodScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AcademicPeriod"> | string;
    name?: Prisma.StringWithAggregatesFilter<"AcademicPeriod"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"AcademicPeriod"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"AcademicPeriod"> | string | null;
    programId?: Prisma.StringWithAggregatesFilter<"AcademicPeriod"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AcademicPeriod"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"AcademicPeriod"> | Date | string;
};
export type AcademicPeriodCreateInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    program: Prisma.ProgramCreateNestedOneWithoutAcademicPeriodsInput;
    subjects?: Prisma.SubjectCreateNestedManyWithoutAcademicPeriodInput;
    noteRequests?: Prisma.NoteRequestCreateNestedManyWithoutAcademicPeriodInput;
};
export type AcademicPeriodUncheckedCreateInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    programId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subjects?: Prisma.SubjectUncheckedCreateNestedManyWithoutAcademicPeriodInput;
    noteRequests?: Prisma.NoteRequestUncheckedCreateNestedManyWithoutAcademicPeriodInput;
};
export type AcademicPeriodUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    program?: Prisma.ProgramUpdateOneRequiredWithoutAcademicPeriodsNestedInput;
    subjects?: Prisma.SubjectUpdateManyWithoutAcademicPeriodNestedInput;
    noteRequests?: Prisma.NoteRequestUpdateManyWithoutAcademicPeriodNestedInput;
};
export type AcademicPeriodUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    programId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subjects?: Prisma.SubjectUncheckedUpdateManyWithoutAcademicPeriodNestedInput;
    noteRequests?: Prisma.NoteRequestUncheckedUpdateManyWithoutAcademicPeriodNestedInput;
};
export type AcademicPeriodCreateManyInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    programId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AcademicPeriodUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AcademicPeriodUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    programId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AcademicPeriodListRelationFilter = {
    every?: Prisma.AcademicPeriodWhereInput;
    some?: Prisma.AcademicPeriodWhereInput;
    none?: Prisma.AcademicPeriodWhereInput;
};
export type AcademicPeriodOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AcademicPeriodProgramIdNameCompoundUniqueInput = {
    programId: string;
    name: string;
};
export type AcademicPeriodProgramIdSlugCompoundUniqueInput = {
    programId: string;
    slug: string;
};
export type AcademicPeriodCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AcademicPeriodMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AcademicPeriodMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AcademicPeriodScalarRelationFilter = {
    is?: Prisma.AcademicPeriodWhereInput;
    isNot?: Prisma.AcademicPeriodWhereInput;
};
export type AcademicPeriodNullableScalarRelationFilter = {
    is?: Prisma.AcademicPeriodWhereInput | null;
    isNot?: Prisma.AcademicPeriodWhereInput | null;
};
export type AcademicPeriodCreateNestedManyWithoutProgramInput = {
    create?: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutProgramInput, Prisma.AcademicPeriodUncheckedCreateWithoutProgramInput> | Prisma.AcademicPeriodCreateWithoutProgramInput[] | Prisma.AcademicPeriodUncheckedCreateWithoutProgramInput[];
    connectOrCreate?: Prisma.AcademicPeriodCreateOrConnectWithoutProgramInput | Prisma.AcademicPeriodCreateOrConnectWithoutProgramInput[];
    createMany?: Prisma.AcademicPeriodCreateManyProgramInputEnvelope;
    connect?: Prisma.AcademicPeriodWhereUniqueInput | Prisma.AcademicPeriodWhereUniqueInput[];
};
export type AcademicPeriodUncheckedCreateNestedManyWithoutProgramInput = {
    create?: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutProgramInput, Prisma.AcademicPeriodUncheckedCreateWithoutProgramInput> | Prisma.AcademicPeriodCreateWithoutProgramInput[] | Prisma.AcademicPeriodUncheckedCreateWithoutProgramInput[];
    connectOrCreate?: Prisma.AcademicPeriodCreateOrConnectWithoutProgramInput | Prisma.AcademicPeriodCreateOrConnectWithoutProgramInput[];
    createMany?: Prisma.AcademicPeriodCreateManyProgramInputEnvelope;
    connect?: Prisma.AcademicPeriodWhereUniqueInput | Prisma.AcademicPeriodWhereUniqueInput[];
};
export type AcademicPeriodUpdateManyWithoutProgramNestedInput = {
    create?: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutProgramInput, Prisma.AcademicPeriodUncheckedCreateWithoutProgramInput> | Prisma.AcademicPeriodCreateWithoutProgramInput[] | Prisma.AcademicPeriodUncheckedCreateWithoutProgramInput[];
    connectOrCreate?: Prisma.AcademicPeriodCreateOrConnectWithoutProgramInput | Prisma.AcademicPeriodCreateOrConnectWithoutProgramInput[];
    upsert?: Prisma.AcademicPeriodUpsertWithWhereUniqueWithoutProgramInput | Prisma.AcademicPeriodUpsertWithWhereUniqueWithoutProgramInput[];
    createMany?: Prisma.AcademicPeriodCreateManyProgramInputEnvelope;
    set?: Prisma.AcademicPeriodWhereUniqueInput | Prisma.AcademicPeriodWhereUniqueInput[];
    disconnect?: Prisma.AcademicPeriodWhereUniqueInput | Prisma.AcademicPeriodWhereUniqueInput[];
    delete?: Prisma.AcademicPeriodWhereUniqueInput | Prisma.AcademicPeriodWhereUniqueInput[];
    connect?: Prisma.AcademicPeriodWhereUniqueInput | Prisma.AcademicPeriodWhereUniqueInput[];
    update?: Prisma.AcademicPeriodUpdateWithWhereUniqueWithoutProgramInput | Prisma.AcademicPeriodUpdateWithWhereUniqueWithoutProgramInput[];
    updateMany?: Prisma.AcademicPeriodUpdateManyWithWhereWithoutProgramInput | Prisma.AcademicPeriodUpdateManyWithWhereWithoutProgramInput[];
    deleteMany?: Prisma.AcademicPeriodScalarWhereInput | Prisma.AcademicPeriodScalarWhereInput[];
};
export type AcademicPeriodUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutProgramInput, Prisma.AcademicPeriodUncheckedCreateWithoutProgramInput> | Prisma.AcademicPeriodCreateWithoutProgramInput[] | Prisma.AcademicPeriodUncheckedCreateWithoutProgramInput[];
    connectOrCreate?: Prisma.AcademicPeriodCreateOrConnectWithoutProgramInput | Prisma.AcademicPeriodCreateOrConnectWithoutProgramInput[];
    upsert?: Prisma.AcademicPeriodUpsertWithWhereUniqueWithoutProgramInput | Prisma.AcademicPeriodUpsertWithWhereUniqueWithoutProgramInput[];
    createMany?: Prisma.AcademicPeriodCreateManyProgramInputEnvelope;
    set?: Prisma.AcademicPeriodWhereUniqueInput | Prisma.AcademicPeriodWhereUniqueInput[];
    disconnect?: Prisma.AcademicPeriodWhereUniqueInput | Prisma.AcademicPeriodWhereUniqueInput[];
    delete?: Prisma.AcademicPeriodWhereUniqueInput | Prisma.AcademicPeriodWhereUniqueInput[];
    connect?: Prisma.AcademicPeriodWhereUniqueInput | Prisma.AcademicPeriodWhereUniqueInput[];
    update?: Prisma.AcademicPeriodUpdateWithWhereUniqueWithoutProgramInput | Prisma.AcademicPeriodUpdateWithWhereUniqueWithoutProgramInput[];
    updateMany?: Prisma.AcademicPeriodUpdateManyWithWhereWithoutProgramInput | Prisma.AcademicPeriodUpdateManyWithWhereWithoutProgramInput[];
    deleteMany?: Prisma.AcademicPeriodScalarWhereInput | Prisma.AcademicPeriodScalarWhereInput[];
};
export type AcademicPeriodCreateNestedOneWithoutSubjectsInput = {
    create?: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutSubjectsInput, Prisma.AcademicPeriodUncheckedCreateWithoutSubjectsInput>;
    connectOrCreate?: Prisma.AcademicPeriodCreateOrConnectWithoutSubjectsInput;
    connect?: Prisma.AcademicPeriodWhereUniqueInput;
};
export type AcademicPeriodUpdateOneRequiredWithoutSubjectsNestedInput = {
    create?: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutSubjectsInput, Prisma.AcademicPeriodUncheckedCreateWithoutSubjectsInput>;
    connectOrCreate?: Prisma.AcademicPeriodCreateOrConnectWithoutSubjectsInput;
    upsert?: Prisma.AcademicPeriodUpsertWithoutSubjectsInput;
    connect?: Prisma.AcademicPeriodWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AcademicPeriodUpdateToOneWithWhereWithoutSubjectsInput, Prisma.AcademicPeriodUpdateWithoutSubjectsInput>, Prisma.AcademicPeriodUncheckedUpdateWithoutSubjectsInput>;
};
export type AcademicPeriodCreateNestedOneWithoutNoteRequestsInput = {
    create?: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutNoteRequestsInput, Prisma.AcademicPeriodUncheckedCreateWithoutNoteRequestsInput>;
    connectOrCreate?: Prisma.AcademicPeriodCreateOrConnectWithoutNoteRequestsInput;
    connect?: Prisma.AcademicPeriodWhereUniqueInput;
};
export type AcademicPeriodUpdateOneWithoutNoteRequestsNestedInput = {
    create?: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutNoteRequestsInput, Prisma.AcademicPeriodUncheckedCreateWithoutNoteRequestsInput>;
    connectOrCreate?: Prisma.AcademicPeriodCreateOrConnectWithoutNoteRequestsInput;
    upsert?: Prisma.AcademicPeriodUpsertWithoutNoteRequestsInput;
    disconnect?: Prisma.AcademicPeriodWhereInput | boolean;
    delete?: Prisma.AcademicPeriodWhereInput | boolean;
    connect?: Prisma.AcademicPeriodWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AcademicPeriodUpdateToOneWithWhereWithoutNoteRequestsInput, Prisma.AcademicPeriodUpdateWithoutNoteRequestsInput>, Prisma.AcademicPeriodUncheckedUpdateWithoutNoteRequestsInput>;
};
export type AcademicPeriodCreateWithoutProgramInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subjects?: Prisma.SubjectCreateNestedManyWithoutAcademicPeriodInput;
    noteRequests?: Prisma.NoteRequestCreateNestedManyWithoutAcademicPeriodInput;
};
export type AcademicPeriodUncheckedCreateWithoutProgramInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subjects?: Prisma.SubjectUncheckedCreateNestedManyWithoutAcademicPeriodInput;
    noteRequests?: Prisma.NoteRequestUncheckedCreateNestedManyWithoutAcademicPeriodInput;
};
export type AcademicPeriodCreateOrConnectWithoutProgramInput = {
    where: Prisma.AcademicPeriodWhereUniqueInput;
    create: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutProgramInput, Prisma.AcademicPeriodUncheckedCreateWithoutProgramInput>;
};
export type AcademicPeriodCreateManyProgramInputEnvelope = {
    data: Prisma.AcademicPeriodCreateManyProgramInput | Prisma.AcademicPeriodCreateManyProgramInput[];
    skipDuplicates?: boolean;
};
export type AcademicPeriodUpsertWithWhereUniqueWithoutProgramInput = {
    where: Prisma.AcademicPeriodWhereUniqueInput;
    update: Prisma.XOR<Prisma.AcademicPeriodUpdateWithoutProgramInput, Prisma.AcademicPeriodUncheckedUpdateWithoutProgramInput>;
    create: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutProgramInput, Prisma.AcademicPeriodUncheckedCreateWithoutProgramInput>;
};
export type AcademicPeriodUpdateWithWhereUniqueWithoutProgramInput = {
    where: Prisma.AcademicPeriodWhereUniqueInput;
    data: Prisma.XOR<Prisma.AcademicPeriodUpdateWithoutProgramInput, Prisma.AcademicPeriodUncheckedUpdateWithoutProgramInput>;
};
export type AcademicPeriodUpdateManyWithWhereWithoutProgramInput = {
    where: Prisma.AcademicPeriodScalarWhereInput;
    data: Prisma.XOR<Prisma.AcademicPeriodUpdateManyMutationInput, Prisma.AcademicPeriodUncheckedUpdateManyWithoutProgramInput>;
};
export type AcademicPeriodScalarWhereInput = {
    AND?: Prisma.AcademicPeriodScalarWhereInput | Prisma.AcademicPeriodScalarWhereInput[];
    OR?: Prisma.AcademicPeriodScalarWhereInput[];
    NOT?: Prisma.AcademicPeriodScalarWhereInput | Prisma.AcademicPeriodScalarWhereInput[];
    id?: Prisma.StringFilter<"AcademicPeriod"> | string;
    name?: Prisma.StringFilter<"AcademicPeriod"> | string;
    slug?: Prisma.StringFilter<"AcademicPeriod"> | string;
    description?: Prisma.StringNullableFilter<"AcademicPeriod"> | string | null;
    programId?: Prisma.StringFilter<"AcademicPeriod"> | string;
    createdAt?: Prisma.DateTimeFilter<"AcademicPeriod"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"AcademicPeriod"> | Date | string;
};
export type AcademicPeriodCreateWithoutSubjectsInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    program: Prisma.ProgramCreateNestedOneWithoutAcademicPeriodsInput;
    noteRequests?: Prisma.NoteRequestCreateNestedManyWithoutAcademicPeriodInput;
};
export type AcademicPeriodUncheckedCreateWithoutSubjectsInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    programId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    noteRequests?: Prisma.NoteRequestUncheckedCreateNestedManyWithoutAcademicPeriodInput;
};
export type AcademicPeriodCreateOrConnectWithoutSubjectsInput = {
    where: Prisma.AcademicPeriodWhereUniqueInput;
    create: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutSubjectsInput, Prisma.AcademicPeriodUncheckedCreateWithoutSubjectsInput>;
};
export type AcademicPeriodUpsertWithoutSubjectsInput = {
    update: Prisma.XOR<Prisma.AcademicPeriodUpdateWithoutSubjectsInput, Prisma.AcademicPeriodUncheckedUpdateWithoutSubjectsInput>;
    create: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutSubjectsInput, Prisma.AcademicPeriodUncheckedCreateWithoutSubjectsInput>;
    where?: Prisma.AcademicPeriodWhereInput;
};
export type AcademicPeriodUpdateToOneWithWhereWithoutSubjectsInput = {
    where?: Prisma.AcademicPeriodWhereInput;
    data: Prisma.XOR<Prisma.AcademicPeriodUpdateWithoutSubjectsInput, Prisma.AcademicPeriodUncheckedUpdateWithoutSubjectsInput>;
};
export type AcademicPeriodUpdateWithoutSubjectsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    program?: Prisma.ProgramUpdateOneRequiredWithoutAcademicPeriodsNestedInput;
    noteRequests?: Prisma.NoteRequestUpdateManyWithoutAcademicPeriodNestedInput;
};
export type AcademicPeriodUncheckedUpdateWithoutSubjectsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    programId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    noteRequests?: Prisma.NoteRequestUncheckedUpdateManyWithoutAcademicPeriodNestedInput;
};
export type AcademicPeriodCreateWithoutNoteRequestsInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    program: Prisma.ProgramCreateNestedOneWithoutAcademicPeriodsInput;
    subjects?: Prisma.SubjectCreateNestedManyWithoutAcademicPeriodInput;
};
export type AcademicPeriodUncheckedCreateWithoutNoteRequestsInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    programId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    subjects?: Prisma.SubjectUncheckedCreateNestedManyWithoutAcademicPeriodInput;
};
export type AcademicPeriodCreateOrConnectWithoutNoteRequestsInput = {
    where: Prisma.AcademicPeriodWhereUniqueInput;
    create: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutNoteRequestsInput, Prisma.AcademicPeriodUncheckedCreateWithoutNoteRequestsInput>;
};
export type AcademicPeriodUpsertWithoutNoteRequestsInput = {
    update: Prisma.XOR<Prisma.AcademicPeriodUpdateWithoutNoteRequestsInput, Prisma.AcademicPeriodUncheckedUpdateWithoutNoteRequestsInput>;
    create: Prisma.XOR<Prisma.AcademicPeriodCreateWithoutNoteRequestsInput, Prisma.AcademicPeriodUncheckedCreateWithoutNoteRequestsInput>;
    where?: Prisma.AcademicPeriodWhereInput;
};
export type AcademicPeriodUpdateToOneWithWhereWithoutNoteRequestsInput = {
    where?: Prisma.AcademicPeriodWhereInput;
    data: Prisma.XOR<Prisma.AcademicPeriodUpdateWithoutNoteRequestsInput, Prisma.AcademicPeriodUncheckedUpdateWithoutNoteRequestsInput>;
};
export type AcademicPeriodUpdateWithoutNoteRequestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    program?: Prisma.ProgramUpdateOneRequiredWithoutAcademicPeriodsNestedInput;
    subjects?: Prisma.SubjectUpdateManyWithoutAcademicPeriodNestedInput;
};
export type AcademicPeriodUncheckedUpdateWithoutNoteRequestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    programId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subjects?: Prisma.SubjectUncheckedUpdateManyWithoutAcademicPeriodNestedInput;
};
export type AcademicPeriodCreateManyProgramInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AcademicPeriodUpdateWithoutProgramInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subjects?: Prisma.SubjectUpdateManyWithoutAcademicPeriodNestedInput;
    noteRequests?: Prisma.NoteRequestUpdateManyWithoutAcademicPeriodNestedInput;
};
export type AcademicPeriodUncheckedUpdateWithoutProgramInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subjects?: Prisma.SubjectUncheckedUpdateManyWithoutAcademicPeriodNestedInput;
    noteRequests?: Prisma.NoteRequestUncheckedUpdateManyWithoutAcademicPeriodNestedInput;
};
export type AcademicPeriodUncheckedUpdateManyWithoutProgramInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type AcademicPeriodCountOutputType
 */
export type AcademicPeriodCountOutputType = {
    subjects: number;
    noteRequests: number;
};
export type AcademicPeriodCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subjects?: boolean | AcademicPeriodCountOutputTypeCountSubjectsArgs;
    noteRequests?: boolean | AcademicPeriodCountOutputTypeCountNoteRequestsArgs;
};
/**
 * AcademicPeriodCountOutputType without action
 */
export type AcademicPeriodCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriodCountOutputType
     */
    select?: Prisma.AcademicPeriodCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * AcademicPeriodCountOutputType without action
 */
export type AcademicPeriodCountOutputTypeCountSubjectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubjectWhereInput;
};
/**
 * AcademicPeriodCountOutputType without action
 */
export type AcademicPeriodCountOutputTypeCountNoteRequestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NoteRequestWhereInput;
};
export type AcademicPeriodSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    description?: boolean;
    programId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>;
    subjects?: boolean | Prisma.AcademicPeriod$subjectsArgs<ExtArgs>;
    noteRequests?: boolean | Prisma.AcademicPeriod$noteRequestsArgs<ExtArgs>;
    _count?: boolean | Prisma.AcademicPeriodCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["academicPeriod"]>;
export type AcademicPeriodSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    description?: boolean;
    programId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["academicPeriod"]>;
export type AcademicPeriodSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    description?: boolean;
    programId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["academicPeriod"]>;
export type AcademicPeriodSelectScalar = {
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    description?: boolean;
    programId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AcademicPeriodOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "slug" | "description" | "programId" | "createdAt" | "updatedAt", ExtArgs["result"]["academicPeriod"]>;
export type AcademicPeriodInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>;
    subjects?: boolean | Prisma.AcademicPeriod$subjectsArgs<ExtArgs>;
    noteRequests?: boolean | Prisma.AcademicPeriod$noteRequestsArgs<ExtArgs>;
    _count?: boolean | Prisma.AcademicPeriodCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AcademicPeriodIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>;
};
export type AcademicPeriodIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    program?: boolean | Prisma.ProgramDefaultArgs<ExtArgs>;
};
export type $AcademicPeriodPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AcademicPeriod";
    objects: {
        program: Prisma.$ProgramPayload<ExtArgs>;
        subjects: Prisma.$SubjectPayload<ExtArgs>[];
        noteRequests: Prisma.$NoteRequestPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        slug: string;
        description: string | null;
        programId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["academicPeriod"]>;
    composites: {};
};
export type AcademicPeriodGetPayload<S extends boolean | null | undefined | AcademicPeriodDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AcademicPeriodPayload, S>;
export type AcademicPeriodCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AcademicPeriodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AcademicPeriodCountAggregateInputType | true;
};
export interface AcademicPeriodDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AcademicPeriod'];
        meta: {
            name: 'AcademicPeriod';
        };
    };
    /**
     * Find zero or one AcademicPeriod that matches the filter.
     * @param {AcademicPeriodFindUniqueArgs} args - Arguments to find a AcademicPeriod
     * @example
     * // Get one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademicPeriodFindUniqueArgs>(args: Prisma.SelectSubset<T, AcademicPeriodFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AcademicPeriodClient<runtime.Types.Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one AcademicPeriod that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcademicPeriodFindUniqueOrThrowArgs} args - Arguments to find a AcademicPeriod
     * @example
     * // Get one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademicPeriodFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AcademicPeriodFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AcademicPeriodClient<runtime.Types.Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AcademicPeriod that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodFindFirstArgs} args - Arguments to find a AcademicPeriod
     * @example
     * // Get one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademicPeriodFindFirstArgs>(args?: Prisma.SelectSubset<T, AcademicPeriodFindFirstArgs<ExtArgs>>): Prisma.Prisma__AcademicPeriodClient<runtime.Types.Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AcademicPeriod that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodFindFirstOrThrowArgs} args - Arguments to find a AcademicPeriod
     * @example
     * // Get one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademicPeriodFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AcademicPeriodFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AcademicPeriodClient<runtime.Types.Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more AcademicPeriods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademicPeriods
     * const academicPeriods = await prisma.academicPeriod.findMany()
     *
     * // Get first 10 AcademicPeriods
     * const academicPeriods = await prisma.academicPeriod.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const academicPeriodWithIdOnly = await prisma.academicPeriod.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AcademicPeriodFindManyArgs>(args?: Prisma.SelectSubset<T, AcademicPeriodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a AcademicPeriod.
     * @param {AcademicPeriodCreateArgs} args - Arguments to create a AcademicPeriod.
     * @example
     * // Create one AcademicPeriod
     * const AcademicPeriod = await prisma.academicPeriod.create({
     *   data: {
     *     // ... data to create a AcademicPeriod
     *   }
     * })
     *
     */
    create<T extends AcademicPeriodCreateArgs>(args: Prisma.SelectSubset<T, AcademicPeriodCreateArgs<ExtArgs>>): Prisma.Prisma__AcademicPeriodClient<runtime.Types.Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many AcademicPeriods.
     * @param {AcademicPeriodCreateManyArgs} args - Arguments to create many AcademicPeriods.
     * @example
     * // Create many AcademicPeriods
     * const academicPeriod = await prisma.academicPeriod.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AcademicPeriodCreateManyArgs>(args?: Prisma.SelectSubset<T, AcademicPeriodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many AcademicPeriods and returns the data saved in the database.
     * @param {AcademicPeriodCreateManyAndReturnArgs} args - Arguments to create many AcademicPeriods.
     * @example
     * // Create many AcademicPeriods
     * const academicPeriod = await prisma.academicPeriod.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AcademicPeriods and only return the `id`
     * const academicPeriodWithIdOnly = await prisma.academicPeriod.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AcademicPeriodCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AcademicPeriodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a AcademicPeriod.
     * @param {AcademicPeriodDeleteArgs} args - Arguments to delete one AcademicPeriod.
     * @example
     * // Delete one AcademicPeriod
     * const AcademicPeriod = await prisma.academicPeriod.delete({
     *   where: {
     *     // ... filter to delete one AcademicPeriod
     *   }
     * })
     *
     */
    delete<T extends AcademicPeriodDeleteArgs>(args: Prisma.SelectSubset<T, AcademicPeriodDeleteArgs<ExtArgs>>): Prisma.Prisma__AcademicPeriodClient<runtime.Types.Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one AcademicPeriod.
     * @param {AcademicPeriodUpdateArgs} args - Arguments to update one AcademicPeriod.
     * @example
     * // Update one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AcademicPeriodUpdateArgs>(args: Prisma.SelectSubset<T, AcademicPeriodUpdateArgs<ExtArgs>>): Prisma.Prisma__AcademicPeriodClient<runtime.Types.Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more AcademicPeriods.
     * @param {AcademicPeriodDeleteManyArgs} args - Arguments to filter AcademicPeriods to delete.
     * @example
     * // Delete a few AcademicPeriods
     * const { count } = await prisma.academicPeriod.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AcademicPeriodDeleteManyArgs>(args?: Prisma.SelectSubset<T, AcademicPeriodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AcademicPeriods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademicPeriods
     * const academicPeriod = await prisma.academicPeriod.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AcademicPeriodUpdateManyArgs>(args: Prisma.SelectSubset<T, AcademicPeriodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AcademicPeriods and returns the data updated in the database.
     * @param {AcademicPeriodUpdateManyAndReturnArgs} args - Arguments to update many AcademicPeriods.
     * @example
     * // Update many AcademicPeriods
     * const academicPeriod = await prisma.academicPeriod.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AcademicPeriods and only return the `id`
     * const academicPeriodWithIdOnly = await prisma.academicPeriod.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AcademicPeriodUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AcademicPeriodUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one AcademicPeriod.
     * @param {AcademicPeriodUpsertArgs} args - Arguments to update or create a AcademicPeriod.
     * @example
     * // Update or create a AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.upsert({
     *   create: {
     *     // ... data to create a AcademicPeriod
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademicPeriod we want to update
     *   }
     * })
     */
    upsert<T extends AcademicPeriodUpsertArgs>(args: Prisma.SelectSubset<T, AcademicPeriodUpsertArgs<ExtArgs>>): Prisma.Prisma__AcademicPeriodClient<runtime.Types.Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of AcademicPeriods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodCountArgs} args - Arguments to filter AcademicPeriods to count.
     * @example
     * // Count the number of AcademicPeriods
     * const count = await prisma.academicPeriod.count({
     *   where: {
     *     // ... the filter for the AcademicPeriods we want to count
     *   }
     * })
    **/
    count<T extends AcademicPeriodCountArgs>(args?: Prisma.Subset<T, AcademicPeriodCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AcademicPeriodCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a AcademicPeriod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcademicPeriodAggregateArgs>(args: Prisma.Subset<T, AcademicPeriodAggregateArgs>): Prisma.PrismaPromise<GetAcademicPeriodAggregateType<T>>;
    /**
     * Group by AcademicPeriod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends AcademicPeriodGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AcademicPeriodGroupByArgs['orderBy'];
    } : {
        orderBy?: AcademicPeriodGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AcademicPeriodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicPeriodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AcademicPeriod model
     */
    readonly fields: AcademicPeriodFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for AcademicPeriod.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AcademicPeriodClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    program<T extends Prisma.ProgramDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProgramDefaultArgs<ExtArgs>>): Prisma.Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    subjects<T extends Prisma.AcademicPeriod$subjectsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AcademicPeriod$subjectsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    noteRequests<T extends Prisma.AcademicPeriod$noteRequestsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AcademicPeriod$noteRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the AcademicPeriod model
 */
export interface AcademicPeriodFieldRefs {
    readonly id: Prisma.FieldRef<"AcademicPeriod", 'String'>;
    readonly name: Prisma.FieldRef<"AcademicPeriod", 'String'>;
    readonly slug: Prisma.FieldRef<"AcademicPeriod", 'String'>;
    readonly description: Prisma.FieldRef<"AcademicPeriod", 'String'>;
    readonly programId: Prisma.FieldRef<"AcademicPeriod", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AcademicPeriod", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"AcademicPeriod", 'DateTime'>;
}
/**
 * AcademicPeriod findUnique
 */
export type AcademicPeriodFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: Prisma.AcademicPeriodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: Prisma.AcademicPeriodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AcademicPeriodInclude<ExtArgs> | null;
    /**
     * Filter, which AcademicPeriod to fetch.
     */
    where: Prisma.AcademicPeriodWhereUniqueInput;
};
/**
 * AcademicPeriod findUniqueOrThrow
 */
export type AcademicPeriodFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: Prisma.AcademicPeriodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: Prisma.AcademicPeriodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AcademicPeriodInclude<ExtArgs> | null;
    /**
     * Filter, which AcademicPeriod to fetch.
     */
    where: Prisma.AcademicPeriodWhereUniqueInput;
};
/**
 * AcademicPeriod findFirst
 */
export type AcademicPeriodFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: Prisma.AcademicPeriodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: Prisma.AcademicPeriodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AcademicPeriodInclude<ExtArgs> | null;
    /**
     * Filter, which AcademicPeriod to fetch.
     */
    where?: Prisma.AcademicPeriodWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AcademicPeriods to fetch.
     */
    orderBy?: Prisma.AcademicPeriodOrderByWithRelationInput | Prisma.AcademicPeriodOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AcademicPeriods.
     */
    cursor?: Prisma.AcademicPeriodWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AcademicPeriods from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AcademicPeriods.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AcademicPeriods.
     */
    distinct?: Prisma.AcademicPeriodScalarFieldEnum | Prisma.AcademicPeriodScalarFieldEnum[];
};
/**
 * AcademicPeriod findFirstOrThrow
 */
export type AcademicPeriodFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: Prisma.AcademicPeriodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: Prisma.AcademicPeriodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AcademicPeriodInclude<ExtArgs> | null;
    /**
     * Filter, which AcademicPeriod to fetch.
     */
    where?: Prisma.AcademicPeriodWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AcademicPeriods to fetch.
     */
    orderBy?: Prisma.AcademicPeriodOrderByWithRelationInput | Prisma.AcademicPeriodOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AcademicPeriods.
     */
    cursor?: Prisma.AcademicPeriodWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AcademicPeriods from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AcademicPeriods.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AcademicPeriods.
     */
    distinct?: Prisma.AcademicPeriodScalarFieldEnum | Prisma.AcademicPeriodScalarFieldEnum[];
};
/**
 * AcademicPeriod findMany
 */
export type AcademicPeriodFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: Prisma.AcademicPeriodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: Prisma.AcademicPeriodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AcademicPeriodInclude<ExtArgs> | null;
    /**
     * Filter, which AcademicPeriods to fetch.
     */
    where?: Prisma.AcademicPeriodWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AcademicPeriods to fetch.
     */
    orderBy?: Prisma.AcademicPeriodOrderByWithRelationInput | Prisma.AcademicPeriodOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AcademicPeriods.
     */
    cursor?: Prisma.AcademicPeriodWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AcademicPeriods from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AcademicPeriods.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AcademicPeriods.
     */
    distinct?: Prisma.AcademicPeriodScalarFieldEnum | Prisma.AcademicPeriodScalarFieldEnum[];
};
/**
 * AcademicPeriod create
 */
export type AcademicPeriodCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: Prisma.AcademicPeriodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: Prisma.AcademicPeriodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AcademicPeriodInclude<ExtArgs> | null;
    /**
     * The data needed to create a AcademicPeriod.
     */
    data: Prisma.XOR<Prisma.AcademicPeriodCreateInput, Prisma.AcademicPeriodUncheckedCreateInput>;
};
/**
 * AcademicPeriod createMany
 */
export type AcademicPeriodCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademicPeriods.
     */
    data: Prisma.AcademicPeriodCreateManyInput | Prisma.AcademicPeriodCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * AcademicPeriod createManyAndReturn
 */
export type AcademicPeriodCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: Prisma.AcademicPeriodSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: Prisma.AcademicPeriodOmit<ExtArgs> | null;
    /**
     * The data used to create many AcademicPeriods.
     */
    data: Prisma.AcademicPeriodCreateManyInput | Prisma.AcademicPeriodCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AcademicPeriodIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * AcademicPeriod update
 */
export type AcademicPeriodUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: Prisma.AcademicPeriodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: Prisma.AcademicPeriodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AcademicPeriodInclude<ExtArgs> | null;
    /**
     * The data needed to update a AcademicPeriod.
     */
    data: Prisma.XOR<Prisma.AcademicPeriodUpdateInput, Prisma.AcademicPeriodUncheckedUpdateInput>;
    /**
     * Choose, which AcademicPeriod to update.
     */
    where: Prisma.AcademicPeriodWhereUniqueInput;
};
/**
 * AcademicPeriod updateMany
 */
export type AcademicPeriodUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademicPeriods.
     */
    data: Prisma.XOR<Prisma.AcademicPeriodUpdateManyMutationInput, Prisma.AcademicPeriodUncheckedUpdateManyInput>;
    /**
     * Filter which AcademicPeriods to update
     */
    where?: Prisma.AcademicPeriodWhereInput;
    /**
     * Limit how many AcademicPeriods to update.
     */
    limit?: number;
};
/**
 * AcademicPeriod updateManyAndReturn
 */
export type AcademicPeriodUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: Prisma.AcademicPeriodSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: Prisma.AcademicPeriodOmit<ExtArgs> | null;
    /**
     * The data used to update AcademicPeriods.
     */
    data: Prisma.XOR<Prisma.AcademicPeriodUpdateManyMutationInput, Prisma.AcademicPeriodUncheckedUpdateManyInput>;
    /**
     * Filter which AcademicPeriods to update
     */
    where?: Prisma.AcademicPeriodWhereInput;
    /**
     * Limit how many AcademicPeriods to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AcademicPeriodIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * AcademicPeriod upsert
 */
export type AcademicPeriodUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: Prisma.AcademicPeriodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: Prisma.AcademicPeriodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AcademicPeriodInclude<ExtArgs> | null;
    /**
     * The filter to search for the AcademicPeriod to update in case it exists.
     */
    where: Prisma.AcademicPeriodWhereUniqueInput;
    /**
     * In case the AcademicPeriod found by the `where` argument doesn't exist, create a new AcademicPeriod with this data.
     */
    create: Prisma.XOR<Prisma.AcademicPeriodCreateInput, Prisma.AcademicPeriodUncheckedCreateInput>;
    /**
     * In case the AcademicPeriod was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AcademicPeriodUpdateInput, Prisma.AcademicPeriodUncheckedUpdateInput>;
};
/**
 * AcademicPeriod delete
 */
export type AcademicPeriodDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: Prisma.AcademicPeriodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: Prisma.AcademicPeriodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AcademicPeriodInclude<ExtArgs> | null;
    /**
     * Filter which AcademicPeriod to delete.
     */
    where: Prisma.AcademicPeriodWhereUniqueInput;
};
/**
 * AcademicPeriod deleteMany
 */
export type AcademicPeriodDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicPeriods to delete
     */
    where?: Prisma.AcademicPeriodWhereInput;
    /**
     * Limit how many AcademicPeriods to delete.
     */
    limit?: number;
};
/**
 * AcademicPeriod.subjects
 */
export type AcademicPeriod$subjectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: Prisma.SubjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Subject
     */
    omit?: Prisma.SubjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubjectInclude<ExtArgs> | null;
    where?: Prisma.SubjectWhereInput;
    orderBy?: Prisma.SubjectOrderByWithRelationInput | Prisma.SubjectOrderByWithRelationInput[];
    cursor?: Prisma.SubjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubjectScalarFieldEnum | Prisma.SubjectScalarFieldEnum[];
};
/**
 * AcademicPeriod.noteRequests
 */
export type AcademicPeriod$noteRequestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteRequest
     */
    select?: Prisma.NoteRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteRequest
     */
    omit?: Prisma.NoteRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteRequestInclude<ExtArgs> | null;
    where?: Prisma.NoteRequestWhereInput;
    orderBy?: Prisma.NoteRequestOrderByWithRelationInput | Prisma.NoteRequestOrderByWithRelationInput[];
    cursor?: Prisma.NoteRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NoteRequestScalarFieldEnum | Prisma.NoteRequestScalarFieldEnum[];
};
/**
 * AcademicPeriod without action
 */
export type AcademicPeriodDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: Prisma.AcademicPeriodSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: Prisma.AcademicPeriodOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AcademicPeriodInclude<ExtArgs> | null;
};
