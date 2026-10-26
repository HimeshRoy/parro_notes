import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model NoteRequest
 *
 */
export type NoteRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$NoteRequestPayload>;
export type AggregateNoteRequest = {
    _count: NoteRequestCountAggregateOutputType | null;
    _min: NoteRequestMinAggregateOutputType | null;
    _max: NoteRequestMaxAggregateOutputType | null;
};
export type NoteRequestMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    message: string | null;
    educationLevelId: string | null;
    programId: string | null;
    subjectId: string | null;
    topicId: string | null;
    status: $Enums.NoteRequestStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NoteRequestMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    message: string | null;
    educationLevelId: string | null;
    programId: string | null;
    subjectId: string | null;
    topicId: string | null;
    status: $Enums.NoteRequestStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NoteRequestCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    message: number;
    educationLevelId: number;
    programId: number;
    subjectId: number;
    topicId: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type NoteRequestMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    message?: true;
    educationLevelId?: true;
    programId?: true;
    subjectId?: true;
    topicId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NoteRequestMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    message?: true;
    educationLevelId?: true;
    programId?: true;
    subjectId?: true;
    topicId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NoteRequestCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    message?: true;
    educationLevelId?: true;
    programId?: true;
    subjectId?: true;
    topicId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type NoteRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which NoteRequest to aggregate.
     */
    where?: Prisma.NoteRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NoteRequests to fetch.
     */
    orderBy?: Prisma.NoteRequestOrderByWithRelationInput | Prisma.NoteRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.NoteRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NoteRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NoteRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned NoteRequests
    **/
    _count?: true | NoteRequestCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: NoteRequestMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: NoteRequestMaxAggregateInputType;
};
export type GetNoteRequestAggregateType<T extends NoteRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateNoteRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNoteRequest[P]> : Prisma.GetScalarType<T[P], AggregateNoteRequest[P]>;
};
export type NoteRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NoteRequestWhereInput;
    orderBy?: Prisma.NoteRequestOrderByWithAggregationInput | Prisma.NoteRequestOrderByWithAggregationInput[];
    by: Prisma.NoteRequestScalarFieldEnum[] | Prisma.NoteRequestScalarFieldEnum;
    having?: Prisma.NoteRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NoteRequestCountAggregateInputType | true;
    _min?: NoteRequestMinAggregateInputType;
    _max?: NoteRequestMaxAggregateInputType;
};
export type NoteRequestGroupByOutputType = {
    id: string;
    name: string;
    email: string;
    message: string;
    educationLevelId: string | null;
    programId: string | null;
    subjectId: string | null;
    topicId: string | null;
    status: $Enums.NoteRequestStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: NoteRequestCountAggregateOutputType | null;
    _min: NoteRequestMinAggregateOutputType | null;
    _max: NoteRequestMaxAggregateOutputType | null;
};
export type GetNoteRequestGroupByPayload<T extends NoteRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NoteRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NoteRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NoteRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NoteRequestGroupByOutputType[P]>;
}>>;
export type NoteRequestWhereInput = {
    AND?: Prisma.NoteRequestWhereInput | Prisma.NoteRequestWhereInput[];
    OR?: Prisma.NoteRequestWhereInput[];
    NOT?: Prisma.NoteRequestWhereInput | Prisma.NoteRequestWhereInput[];
    id?: Prisma.StringFilter<"NoteRequest"> | string;
    name?: Prisma.StringFilter<"NoteRequest"> | string;
    email?: Prisma.StringFilter<"NoteRequest"> | string;
    message?: Prisma.StringFilter<"NoteRequest"> | string;
    educationLevelId?: Prisma.StringNullableFilter<"NoteRequest"> | string | null;
    programId?: Prisma.StringNullableFilter<"NoteRequest"> | string | null;
    subjectId?: Prisma.StringNullableFilter<"NoteRequest"> | string | null;
    topicId?: Prisma.StringNullableFilter<"NoteRequest"> | string | null;
    status?: Prisma.EnumNoteRequestStatusFilter<"NoteRequest"> | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"NoteRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NoteRequest"> | Date | string;
    educationLevel?: Prisma.XOR<Prisma.EducationLevelNullableScalarRelationFilter, Prisma.EducationLevelWhereInput> | null;
    program?: Prisma.XOR<Prisma.ProgramNullableScalarRelationFilter, Prisma.ProgramWhereInput> | null;
    subject?: Prisma.XOR<Prisma.SubjectNullableScalarRelationFilter, Prisma.SubjectWhereInput> | null;
    topic?: Prisma.XOR<Prisma.TopicNullableScalarRelationFilter, Prisma.TopicWhereInput> | null;
};
export type NoteRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    educationLevelId?: Prisma.SortOrderInput | Prisma.SortOrder;
    programId?: Prisma.SortOrderInput | Prisma.SortOrder;
    subjectId?: Prisma.SortOrderInput | Prisma.SortOrder;
    topicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    educationLevel?: Prisma.EducationLevelOrderByWithRelationInput;
    program?: Prisma.ProgramOrderByWithRelationInput;
    subject?: Prisma.SubjectOrderByWithRelationInput;
    topic?: Prisma.TopicOrderByWithRelationInput;
};
export type NoteRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.NoteRequestWhereInput | Prisma.NoteRequestWhereInput[];
    OR?: Prisma.NoteRequestWhereInput[];
    NOT?: Prisma.NoteRequestWhereInput | Prisma.NoteRequestWhereInput[];
    name?: Prisma.StringFilter<"NoteRequest"> | string;
    email?: Prisma.StringFilter<"NoteRequest"> | string;
    message?: Prisma.StringFilter<"NoteRequest"> | string;
    educationLevelId?: Prisma.StringNullableFilter<"NoteRequest"> | string | null;
    programId?: Prisma.StringNullableFilter<"NoteRequest"> | string | null;
    subjectId?: Prisma.StringNullableFilter<"NoteRequest"> | string | null;
    topicId?: Prisma.StringNullableFilter<"NoteRequest"> | string | null;
    status?: Prisma.EnumNoteRequestStatusFilter<"NoteRequest"> | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"NoteRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NoteRequest"> | Date | string;
    educationLevel?: Prisma.XOR<Prisma.EducationLevelNullableScalarRelationFilter, Prisma.EducationLevelWhereInput> | null;
    program?: Prisma.XOR<Prisma.ProgramNullableScalarRelationFilter, Prisma.ProgramWhereInput> | null;
    subject?: Prisma.XOR<Prisma.SubjectNullableScalarRelationFilter, Prisma.SubjectWhereInput> | null;
    topic?: Prisma.XOR<Prisma.TopicNullableScalarRelationFilter, Prisma.TopicWhereInput> | null;
}, "id">;
export type NoteRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    educationLevelId?: Prisma.SortOrderInput | Prisma.SortOrder;
    programId?: Prisma.SortOrderInput | Prisma.SortOrder;
    subjectId?: Prisma.SortOrderInput | Prisma.SortOrder;
    topicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.NoteRequestCountOrderByAggregateInput;
    _max?: Prisma.NoteRequestMaxOrderByAggregateInput;
    _min?: Prisma.NoteRequestMinOrderByAggregateInput;
};
export type NoteRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.NoteRequestScalarWhereWithAggregatesInput | Prisma.NoteRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.NoteRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NoteRequestScalarWhereWithAggregatesInput | Prisma.NoteRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"NoteRequest"> | string;
    name?: Prisma.StringWithAggregatesFilter<"NoteRequest"> | string;
    email?: Prisma.StringWithAggregatesFilter<"NoteRequest"> | string;
    message?: Prisma.StringWithAggregatesFilter<"NoteRequest"> | string;
    educationLevelId?: Prisma.StringNullableWithAggregatesFilter<"NoteRequest"> | string | null;
    programId?: Prisma.StringNullableWithAggregatesFilter<"NoteRequest"> | string | null;
    subjectId?: Prisma.StringNullableWithAggregatesFilter<"NoteRequest"> | string | null;
    topicId?: Prisma.StringNullableWithAggregatesFilter<"NoteRequest"> | string | null;
    status?: Prisma.EnumNoteRequestStatusWithAggregatesFilter<"NoteRequest"> | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"NoteRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"NoteRequest"> | Date | string;
};
export type NoteRequestCreateInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    educationLevel?: Prisma.EducationLevelCreateNestedOneWithoutNoteRequestsInput;
    program?: Prisma.ProgramCreateNestedOneWithoutNoteRequestsInput;
    subject?: Prisma.SubjectCreateNestedOneWithoutNoteRequestsInput;
    topic?: Prisma.TopicCreateNestedOneWithoutNoteRequestsInput;
};
export type NoteRequestUncheckedCreateInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    educationLevelId?: string | null;
    programId?: string | null;
    subjectId?: string | null;
    topicId?: string | null;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    educationLevel?: Prisma.EducationLevelUpdateOneWithoutNoteRequestsNestedInput;
    program?: Prisma.ProgramUpdateOneWithoutNoteRequestsNestedInput;
    subject?: Prisma.SubjectUpdateOneWithoutNoteRequestsNestedInput;
    topic?: Prisma.TopicUpdateOneWithoutNoteRequestsNestedInput;
};
export type NoteRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    educationLevelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    programId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    topicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteRequestCreateManyInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    educationLevelId?: string | null;
    programId?: string | null;
    subjectId?: string | null;
    topicId?: string | null;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    educationLevelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    programId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    topicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteRequestListRelationFilter = {
    every?: Prisma.NoteRequestWhereInput;
    some?: Prisma.NoteRequestWhereInput;
    none?: Prisma.NoteRequestWhereInput;
};
export type NoteRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NoteRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    educationLevelId?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    topicId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NoteRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    educationLevelId?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    topicId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NoteRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    educationLevelId?: Prisma.SortOrder;
    programId?: Prisma.SortOrder;
    subjectId?: Prisma.SortOrder;
    topicId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NoteRequestCreateNestedManyWithoutEducationLevelInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutEducationLevelInput, Prisma.NoteRequestUncheckedCreateWithoutEducationLevelInput> | Prisma.NoteRequestCreateWithoutEducationLevelInput[] | Prisma.NoteRequestUncheckedCreateWithoutEducationLevelInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutEducationLevelInput | Prisma.NoteRequestCreateOrConnectWithoutEducationLevelInput[];
    createMany?: Prisma.NoteRequestCreateManyEducationLevelInputEnvelope;
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
};
export type NoteRequestUncheckedCreateNestedManyWithoutEducationLevelInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutEducationLevelInput, Prisma.NoteRequestUncheckedCreateWithoutEducationLevelInput> | Prisma.NoteRequestCreateWithoutEducationLevelInput[] | Prisma.NoteRequestUncheckedCreateWithoutEducationLevelInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutEducationLevelInput | Prisma.NoteRequestCreateOrConnectWithoutEducationLevelInput[];
    createMany?: Prisma.NoteRequestCreateManyEducationLevelInputEnvelope;
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
};
export type NoteRequestUpdateManyWithoutEducationLevelNestedInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutEducationLevelInput, Prisma.NoteRequestUncheckedCreateWithoutEducationLevelInput> | Prisma.NoteRequestCreateWithoutEducationLevelInput[] | Prisma.NoteRequestUncheckedCreateWithoutEducationLevelInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutEducationLevelInput | Prisma.NoteRequestCreateOrConnectWithoutEducationLevelInput[];
    upsert?: Prisma.NoteRequestUpsertWithWhereUniqueWithoutEducationLevelInput | Prisma.NoteRequestUpsertWithWhereUniqueWithoutEducationLevelInput[];
    createMany?: Prisma.NoteRequestCreateManyEducationLevelInputEnvelope;
    set?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    disconnect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    delete?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    update?: Prisma.NoteRequestUpdateWithWhereUniqueWithoutEducationLevelInput | Prisma.NoteRequestUpdateWithWhereUniqueWithoutEducationLevelInput[];
    updateMany?: Prisma.NoteRequestUpdateManyWithWhereWithoutEducationLevelInput | Prisma.NoteRequestUpdateManyWithWhereWithoutEducationLevelInput[];
    deleteMany?: Prisma.NoteRequestScalarWhereInput | Prisma.NoteRequestScalarWhereInput[];
};
export type NoteRequestUncheckedUpdateManyWithoutEducationLevelNestedInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutEducationLevelInput, Prisma.NoteRequestUncheckedCreateWithoutEducationLevelInput> | Prisma.NoteRequestCreateWithoutEducationLevelInput[] | Prisma.NoteRequestUncheckedCreateWithoutEducationLevelInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutEducationLevelInput | Prisma.NoteRequestCreateOrConnectWithoutEducationLevelInput[];
    upsert?: Prisma.NoteRequestUpsertWithWhereUniqueWithoutEducationLevelInput | Prisma.NoteRequestUpsertWithWhereUniqueWithoutEducationLevelInput[];
    createMany?: Prisma.NoteRequestCreateManyEducationLevelInputEnvelope;
    set?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    disconnect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    delete?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    update?: Prisma.NoteRequestUpdateWithWhereUniqueWithoutEducationLevelInput | Prisma.NoteRequestUpdateWithWhereUniqueWithoutEducationLevelInput[];
    updateMany?: Prisma.NoteRequestUpdateManyWithWhereWithoutEducationLevelInput | Prisma.NoteRequestUpdateManyWithWhereWithoutEducationLevelInput[];
    deleteMany?: Prisma.NoteRequestScalarWhereInput | Prisma.NoteRequestScalarWhereInput[];
};
export type NoteRequestCreateNestedManyWithoutProgramInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutProgramInput, Prisma.NoteRequestUncheckedCreateWithoutProgramInput> | Prisma.NoteRequestCreateWithoutProgramInput[] | Prisma.NoteRequestUncheckedCreateWithoutProgramInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutProgramInput | Prisma.NoteRequestCreateOrConnectWithoutProgramInput[];
    createMany?: Prisma.NoteRequestCreateManyProgramInputEnvelope;
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
};
export type NoteRequestUncheckedCreateNestedManyWithoutProgramInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutProgramInput, Prisma.NoteRequestUncheckedCreateWithoutProgramInput> | Prisma.NoteRequestCreateWithoutProgramInput[] | Prisma.NoteRequestUncheckedCreateWithoutProgramInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutProgramInput | Prisma.NoteRequestCreateOrConnectWithoutProgramInput[];
    createMany?: Prisma.NoteRequestCreateManyProgramInputEnvelope;
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
};
export type NoteRequestUpdateManyWithoutProgramNestedInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutProgramInput, Prisma.NoteRequestUncheckedCreateWithoutProgramInput> | Prisma.NoteRequestCreateWithoutProgramInput[] | Prisma.NoteRequestUncheckedCreateWithoutProgramInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutProgramInput | Prisma.NoteRequestCreateOrConnectWithoutProgramInput[];
    upsert?: Prisma.NoteRequestUpsertWithWhereUniqueWithoutProgramInput | Prisma.NoteRequestUpsertWithWhereUniqueWithoutProgramInput[];
    createMany?: Prisma.NoteRequestCreateManyProgramInputEnvelope;
    set?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    disconnect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    delete?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    update?: Prisma.NoteRequestUpdateWithWhereUniqueWithoutProgramInput | Prisma.NoteRequestUpdateWithWhereUniqueWithoutProgramInput[];
    updateMany?: Prisma.NoteRequestUpdateManyWithWhereWithoutProgramInput | Prisma.NoteRequestUpdateManyWithWhereWithoutProgramInput[];
    deleteMany?: Prisma.NoteRequestScalarWhereInput | Prisma.NoteRequestScalarWhereInput[];
};
export type NoteRequestUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutProgramInput, Prisma.NoteRequestUncheckedCreateWithoutProgramInput> | Prisma.NoteRequestCreateWithoutProgramInput[] | Prisma.NoteRequestUncheckedCreateWithoutProgramInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutProgramInput | Prisma.NoteRequestCreateOrConnectWithoutProgramInput[];
    upsert?: Prisma.NoteRequestUpsertWithWhereUniqueWithoutProgramInput | Prisma.NoteRequestUpsertWithWhereUniqueWithoutProgramInput[];
    createMany?: Prisma.NoteRequestCreateManyProgramInputEnvelope;
    set?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    disconnect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    delete?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    update?: Prisma.NoteRequestUpdateWithWhereUniqueWithoutProgramInput | Prisma.NoteRequestUpdateWithWhereUniqueWithoutProgramInput[];
    updateMany?: Prisma.NoteRequestUpdateManyWithWhereWithoutProgramInput | Prisma.NoteRequestUpdateManyWithWhereWithoutProgramInput[];
    deleteMany?: Prisma.NoteRequestScalarWhereInput | Prisma.NoteRequestScalarWhereInput[];
};
export type NoteRequestCreateNestedManyWithoutSubjectInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutSubjectInput, Prisma.NoteRequestUncheckedCreateWithoutSubjectInput> | Prisma.NoteRequestCreateWithoutSubjectInput[] | Prisma.NoteRequestUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutSubjectInput | Prisma.NoteRequestCreateOrConnectWithoutSubjectInput[];
    createMany?: Prisma.NoteRequestCreateManySubjectInputEnvelope;
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
};
export type NoteRequestUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutSubjectInput, Prisma.NoteRequestUncheckedCreateWithoutSubjectInput> | Prisma.NoteRequestCreateWithoutSubjectInput[] | Prisma.NoteRequestUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutSubjectInput | Prisma.NoteRequestCreateOrConnectWithoutSubjectInput[];
    createMany?: Prisma.NoteRequestCreateManySubjectInputEnvelope;
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
};
export type NoteRequestUpdateManyWithoutSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutSubjectInput, Prisma.NoteRequestUncheckedCreateWithoutSubjectInput> | Prisma.NoteRequestCreateWithoutSubjectInput[] | Prisma.NoteRequestUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutSubjectInput | Prisma.NoteRequestCreateOrConnectWithoutSubjectInput[];
    upsert?: Prisma.NoteRequestUpsertWithWhereUniqueWithoutSubjectInput | Prisma.NoteRequestUpsertWithWhereUniqueWithoutSubjectInput[];
    createMany?: Prisma.NoteRequestCreateManySubjectInputEnvelope;
    set?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    disconnect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    delete?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    update?: Prisma.NoteRequestUpdateWithWhereUniqueWithoutSubjectInput | Prisma.NoteRequestUpdateWithWhereUniqueWithoutSubjectInput[];
    updateMany?: Prisma.NoteRequestUpdateManyWithWhereWithoutSubjectInput | Prisma.NoteRequestUpdateManyWithWhereWithoutSubjectInput[];
    deleteMany?: Prisma.NoteRequestScalarWhereInput | Prisma.NoteRequestScalarWhereInput[];
};
export type NoteRequestUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutSubjectInput, Prisma.NoteRequestUncheckedCreateWithoutSubjectInput> | Prisma.NoteRequestCreateWithoutSubjectInput[] | Prisma.NoteRequestUncheckedCreateWithoutSubjectInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutSubjectInput | Prisma.NoteRequestCreateOrConnectWithoutSubjectInput[];
    upsert?: Prisma.NoteRequestUpsertWithWhereUniqueWithoutSubjectInput | Prisma.NoteRequestUpsertWithWhereUniqueWithoutSubjectInput[];
    createMany?: Prisma.NoteRequestCreateManySubjectInputEnvelope;
    set?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    disconnect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    delete?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    update?: Prisma.NoteRequestUpdateWithWhereUniqueWithoutSubjectInput | Prisma.NoteRequestUpdateWithWhereUniqueWithoutSubjectInput[];
    updateMany?: Prisma.NoteRequestUpdateManyWithWhereWithoutSubjectInput | Prisma.NoteRequestUpdateManyWithWhereWithoutSubjectInput[];
    deleteMany?: Prisma.NoteRequestScalarWhereInput | Prisma.NoteRequestScalarWhereInput[];
};
export type NoteRequestCreateNestedManyWithoutTopicInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutTopicInput, Prisma.NoteRequestUncheckedCreateWithoutTopicInput> | Prisma.NoteRequestCreateWithoutTopicInput[] | Prisma.NoteRequestUncheckedCreateWithoutTopicInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutTopicInput | Prisma.NoteRequestCreateOrConnectWithoutTopicInput[];
    createMany?: Prisma.NoteRequestCreateManyTopicInputEnvelope;
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
};
export type NoteRequestUncheckedCreateNestedManyWithoutTopicInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutTopicInput, Prisma.NoteRequestUncheckedCreateWithoutTopicInput> | Prisma.NoteRequestCreateWithoutTopicInput[] | Prisma.NoteRequestUncheckedCreateWithoutTopicInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutTopicInput | Prisma.NoteRequestCreateOrConnectWithoutTopicInput[];
    createMany?: Prisma.NoteRequestCreateManyTopicInputEnvelope;
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
};
export type NoteRequestUpdateManyWithoutTopicNestedInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutTopicInput, Prisma.NoteRequestUncheckedCreateWithoutTopicInput> | Prisma.NoteRequestCreateWithoutTopicInput[] | Prisma.NoteRequestUncheckedCreateWithoutTopicInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutTopicInput | Prisma.NoteRequestCreateOrConnectWithoutTopicInput[];
    upsert?: Prisma.NoteRequestUpsertWithWhereUniqueWithoutTopicInput | Prisma.NoteRequestUpsertWithWhereUniqueWithoutTopicInput[];
    createMany?: Prisma.NoteRequestCreateManyTopicInputEnvelope;
    set?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    disconnect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    delete?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    update?: Prisma.NoteRequestUpdateWithWhereUniqueWithoutTopicInput | Prisma.NoteRequestUpdateWithWhereUniqueWithoutTopicInput[];
    updateMany?: Prisma.NoteRequestUpdateManyWithWhereWithoutTopicInput | Prisma.NoteRequestUpdateManyWithWhereWithoutTopicInput[];
    deleteMany?: Prisma.NoteRequestScalarWhereInput | Prisma.NoteRequestScalarWhereInput[];
};
export type NoteRequestUncheckedUpdateManyWithoutTopicNestedInput = {
    create?: Prisma.XOR<Prisma.NoteRequestCreateWithoutTopicInput, Prisma.NoteRequestUncheckedCreateWithoutTopicInput> | Prisma.NoteRequestCreateWithoutTopicInput[] | Prisma.NoteRequestUncheckedCreateWithoutTopicInput[];
    connectOrCreate?: Prisma.NoteRequestCreateOrConnectWithoutTopicInput | Prisma.NoteRequestCreateOrConnectWithoutTopicInput[];
    upsert?: Prisma.NoteRequestUpsertWithWhereUniqueWithoutTopicInput | Prisma.NoteRequestUpsertWithWhereUniqueWithoutTopicInput[];
    createMany?: Prisma.NoteRequestCreateManyTopicInputEnvelope;
    set?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    disconnect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    delete?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    connect?: Prisma.NoteRequestWhereUniqueInput | Prisma.NoteRequestWhereUniqueInput[];
    update?: Prisma.NoteRequestUpdateWithWhereUniqueWithoutTopicInput | Prisma.NoteRequestUpdateWithWhereUniqueWithoutTopicInput[];
    updateMany?: Prisma.NoteRequestUpdateManyWithWhereWithoutTopicInput | Prisma.NoteRequestUpdateManyWithWhereWithoutTopicInput[];
    deleteMany?: Prisma.NoteRequestScalarWhereInput | Prisma.NoteRequestScalarWhereInput[];
};
export type EnumNoteRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.NoteRequestStatus;
};
export type NoteRequestCreateWithoutEducationLevelInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    program?: Prisma.ProgramCreateNestedOneWithoutNoteRequestsInput;
    subject?: Prisma.SubjectCreateNestedOneWithoutNoteRequestsInput;
    topic?: Prisma.TopicCreateNestedOneWithoutNoteRequestsInput;
};
export type NoteRequestUncheckedCreateWithoutEducationLevelInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    programId?: string | null;
    subjectId?: string | null;
    topicId?: string | null;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteRequestCreateOrConnectWithoutEducationLevelInput = {
    where: Prisma.NoteRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.NoteRequestCreateWithoutEducationLevelInput, Prisma.NoteRequestUncheckedCreateWithoutEducationLevelInput>;
};
export type NoteRequestCreateManyEducationLevelInputEnvelope = {
    data: Prisma.NoteRequestCreateManyEducationLevelInput | Prisma.NoteRequestCreateManyEducationLevelInput[];
    skipDuplicates?: boolean;
};
export type NoteRequestUpsertWithWhereUniqueWithoutEducationLevelInput = {
    where: Prisma.NoteRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.NoteRequestUpdateWithoutEducationLevelInput, Prisma.NoteRequestUncheckedUpdateWithoutEducationLevelInput>;
    create: Prisma.XOR<Prisma.NoteRequestCreateWithoutEducationLevelInput, Prisma.NoteRequestUncheckedCreateWithoutEducationLevelInput>;
};
export type NoteRequestUpdateWithWhereUniqueWithoutEducationLevelInput = {
    where: Prisma.NoteRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.NoteRequestUpdateWithoutEducationLevelInput, Prisma.NoteRequestUncheckedUpdateWithoutEducationLevelInput>;
};
export type NoteRequestUpdateManyWithWhereWithoutEducationLevelInput = {
    where: Prisma.NoteRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.NoteRequestUpdateManyMutationInput, Prisma.NoteRequestUncheckedUpdateManyWithoutEducationLevelInput>;
};
export type NoteRequestScalarWhereInput = {
    AND?: Prisma.NoteRequestScalarWhereInput | Prisma.NoteRequestScalarWhereInput[];
    OR?: Prisma.NoteRequestScalarWhereInput[];
    NOT?: Prisma.NoteRequestScalarWhereInput | Prisma.NoteRequestScalarWhereInput[];
    id?: Prisma.StringFilter<"NoteRequest"> | string;
    name?: Prisma.StringFilter<"NoteRequest"> | string;
    email?: Prisma.StringFilter<"NoteRequest"> | string;
    message?: Prisma.StringFilter<"NoteRequest"> | string;
    educationLevelId?: Prisma.StringNullableFilter<"NoteRequest"> | string | null;
    programId?: Prisma.StringNullableFilter<"NoteRequest"> | string | null;
    subjectId?: Prisma.StringNullableFilter<"NoteRequest"> | string | null;
    topicId?: Prisma.StringNullableFilter<"NoteRequest"> | string | null;
    status?: Prisma.EnumNoteRequestStatusFilter<"NoteRequest"> | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"NoteRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NoteRequest"> | Date | string;
};
export type NoteRequestCreateWithoutProgramInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    educationLevel?: Prisma.EducationLevelCreateNestedOneWithoutNoteRequestsInput;
    subject?: Prisma.SubjectCreateNestedOneWithoutNoteRequestsInput;
    topic?: Prisma.TopicCreateNestedOneWithoutNoteRequestsInput;
};
export type NoteRequestUncheckedCreateWithoutProgramInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    educationLevelId?: string | null;
    subjectId?: string | null;
    topicId?: string | null;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteRequestCreateOrConnectWithoutProgramInput = {
    where: Prisma.NoteRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.NoteRequestCreateWithoutProgramInput, Prisma.NoteRequestUncheckedCreateWithoutProgramInput>;
};
export type NoteRequestCreateManyProgramInputEnvelope = {
    data: Prisma.NoteRequestCreateManyProgramInput | Prisma.NoteRequestCreateManyProgramInput[];
    skipDuplicates?: boolean;
};
export type NoteRequestUpsertWithWhereUniqueWithoutProgramInput = {
    where: Prisma.NoteRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.NoteRequestUpdateWithoutProgramInput, Prisma.NoteRequestUncheckedUpdateWithoutProgramInput>;
    create: Prisma.XOR<Prisma.NoteRequestCreateWithoutProgramInput, Prisma.NoteRequestUncheckedCreateWithoutProgramInput>;
};
export type NoteRequestUpdateWithWhereUniqueWithoutProgramInput = {
    where: Prisma.NoteRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.NoteRequestUpdateWithoutProgramInput, Prisma.NoteRequestUncheckedUpdateWithoutProgramInput>;
};
export type NoteRequestUpdateManyWithWhereWithoutProgramInput = {
    where: Prisma.NoteRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.NoteRequestUpdateManyMutationInput, Prisma.NoteRequestUncheckedUpdateManyWithoutProgramInput>;
};
export type NoteRequestCreateWithoutSubjectInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    educationLevel?: Prisma.EducationLevelCreateNestedOneWithoutNoteRequestsInput;
    program?: Prisma.ProgramCreateNestedOneWithoutNoteRequestsInput;
    topic?: Prisma.TopicCreateNestedOneWithoutNoteRequestsInput;
};
export type NoteRequestUncheckedCreateWithoutSubjectInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    educationLevelId?: string | null;
    programId?: string | null;
    topicId?: string | null;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteRequestCreateOrConnectWithoutSubjectInput = {
    where: Prisma.NoteRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.NoteRequestCreateWithoutSubjectInput, Prisma.NoteRequestUncheckedCreateWithoutSubjectInput>;
};
export type NoteRequestCreateManySubjectInputEnvelope = {
    data: Prisma.NoteRequestCreateManySubjectInput | Prisma.NoteRequestCreateManySubjectInput[];
    skipDuplicates?: boolean;
};
export type NoteRequestUpsertWithWhereUniqueWithoutSubjectInput = {
    where: Prisma.NoteRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.NoteRequestUpdateWithoutSubjectInput, Prisma.NoteRequestUncheckedUpdateWithoutSubjectInput>;
    create: Prisma.XOR<Prisma.NoteRequestCreateWithoutSubjectInput, Prisma.NoteRequestUncheckedCreateWithoutSubjectInput>;
};
export type NoteRequestUpdateWithWhereUniqueWithoutSubjectInput = {
    where: Prisma.NoteRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.NoteRequestUpdateWithoutSubjectInput, Prisma.NoteRequestUncheckedUpdateWithoutSubjectInput>;
};
export type NoteRequestUpdateManyWithWhereWithoutSubjectInput = {
    where: Prisma.NoteRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.NoteRequestUpdateManyMutationInput, Prisma.NoteRequestUncheckedUpdateManyWithoutSubjectInput>;
};
export type NoteRequestCreateWithoutTopicInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    educationLevel?: Prisma.EducationLevelCreateNestedOneWithoutNoteRequestsInput;
    program?: Prisma.ProgramCreateNestedOneWithoutNoteRequestsInput;
    subject?: Prisma.SubjectCreateNestedOneWithoutNoteRequestsInput;
};
export type NoteRequestUncheckedCreateWithoutTopicInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    educationLevelId?: string | null;
    programId?: string | null;
    subjectId?: string | null;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteRequestCreateOrConnectWithoutTopicInput = {
    where: Prisma.NoteRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.NoteRequestCreateWithoutTopicInput, Prisma.NoteRequestUncheckedCreateWithoutTopicInput>;
};
export type NoteRequestCreateManyTopicInputEnvelope = {
    data: Prisma.NoteRequestCreateManyTopicInput | Prisma.NoteRequestCreateManyTopicInput[];
    skipDuplicates?: boolean;
};
export type NoteRequestUpsertWithWhereUniqueWithoutTopicInput = {
    where: Prisma.NoteRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.NoteRequestUpdateWithoutTopicInput, Prisma.NoteRequestUncheckedUpdateWithoutTopicInput>;
    create: Prisma.XOR<Prisma.NoteRequestCreateWithoutTopicInput, Prisma.NoteRequestUncheckedCreateWithoutTopicInput>;
};
export type NoteRequestUpdateWithWhereUniqueWithoutTopicInput = {
    where: Prisma.NoteRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.NoteRequestUpdateWithoutTopicInput, Prisma.NoteRequestUncheckedUpdateWithoutTopicInput>;
};
export type NoteRequestUpdateManyWithWhereWithoutTopicInput = {
    where: Prisma.NoteRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.NoteRequestUpdateManyMutationInput, Prisma.NoteRequestUncheckedUpdateManyWithoutTopicInput>;
};
export type NoteRequestCreateManyEducationLevelInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    programId?: string | null;
    subjectId?: string | null;
    topicId?: string | null;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteRequestUpdateWithoutEducationLevelInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    program?: Prisma.ProgramUpdateOneWithoutNoteRequestsNestedInput;
    subject?: Prisma.SubjectUpdateOneWithoutNoteRequestsNestedInput;
    topic?: Prisma.TopicUpdateOneWithoutNoteRequestsNestedInput;
};
export type NoteRequestUncheckedUpdateWithoutEducationLevelInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    programId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    topicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteRequestUncheckedUpdateManyWithoutEducationLevelInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    programId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    topicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteRequestCreateManyProgramInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    educationLevelId?: string | null;
    subjectId?: string | null;
    topicId?: string | null;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteRequestUpdateWithoutProgramInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    educationLevel?: Prisma.EducationLevelUpdateOneWithoutNoteRequestsNestedInput;
    subject?: Prisma.SubjectUpdateOneWithoutNoteRequestsNestedInput;
    topic?: Prisma.TopicUpdateOneWithoutNoteRequestsNestedInput;
};
export type NoteRequestUncheckedUpdateWithoutProgramInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    educationLevelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    topicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteRequestUncheckedUpdateManyWithoutProgramInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    educationLevelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    topicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteRequestCreateManySubjectInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    educationLevelId?: string | null;
    programId?: string | null;
    topicId?: string | null;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteRequestUpdateWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    educationLevel?: Prisma.EducationLevelUpdateOneWithoutNoteRequestsNestedInput;
    program?: Prisma.ProgramUpdateOneWithoutNoteRequestsNestedInput;
    topic?: Prisma.TopicUpdateOneWithoutNoteRequestsNestedInput;
};
export type NoteRequestUncheckedUpdateWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    educationLevelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    programId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    topicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteRequestUncheckedUpdateManyWithoutSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    educationLevelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    programId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    topicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteRequestCreateManyTopicInput = {
    id?: string;
    name: string;
    email: string;
    message: string;
    educationLevelId?: string | null;
    programId?: string | null;
    subjectId?: string | null;
    status?: $Enums.NoteRequestStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteRequestUpdateWithoutTopicInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    educationLevel?: Prisma.EducationLevelUpdateOneWithoutNoteRequestsNestedInput;
    program?: Prisma.ProgramUpdateOneWithoutNoteRequestsNestedInput;
    subject?: Prisma.SubjectUpdateOneWithoutNoteRequestsNestedInput;
};
export type NoteRequestUncheckedUpdateWithoutTopicInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    educationLevelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    programId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteRequestUncheckedUpdateManyWithoutTopicInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    educationLevelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    programId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumNoteRequestStatusFieldUpdateOperationsInput | $Enums.NoteRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    message?: boolean;
    educationLevelId?: boolean;
    programId?: boolean;
    subjectId?: boolean;
    topicId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    educationLevel?: boolean | Prisma.NoteRequest$educationLevelArgs<ExtArgs>;
    program?: boolean | Prisma.NoteRequest$programArgs<ExtArgs>;
    subject?: boolean | Prisma.NoteRequest$subjectArgs<ExtArgs>;
    topic?: boolean | Prisma.NoteRequest$topicArgs<ExtArgs>;
}, ExtArgs["result"]["noteRequest"]>;
export type NoteRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    message?: boolean;
    educationLevelId?: boolean;
    programId?: boolean;
    subjectId?: boolean;
    topicId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    educationLevel?: boolean | Prisma.NoteRequest$educationLevelArgs<ExtArgs>;
    program?: boolean | Prisma.NoteRequest$programArgs<ExtArgs>;
    subject?: boolean | Prisma.NoteRequest$subjectArgs<ExtArgs>;
    topic?: boolean | Prisma.NoteRequest$topicArgs<ExtArgs>;
}, ExtArgs["result"]["noteRequest"]>;
export type NoteRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    message?: boolean;
    educationLevelId?: boolean;
    programId?: boolean;
    subjectId?: boolean;
    topicId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    educationLevel?: boolean | Prisma.NoteRequest$educationLevelArgs<ExtArgs>;
    program?: boolean | Prisma.NoteRequest$programArgs<ExtArgs>;
    subject?: boolean | Prisma.NoteRequest$subjectArgs<ExtArgs>;
    topic?: boolean | Prisma.NoteRequest$topicArgs<ExtArgs>;
}, ExtArgs["result"]["noteRequest"]>;
export type NoteRequestSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    message?: boolean;
    educationLevelId?: boolean;
    programId?: boolean;
    subjectId?: boolean;
    topicId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type NoteRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "email" | "message" | "educationLevelId" | "programId" | "subjectId" | "topicId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["noteRequest"]>;
export type NoteRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    educationLevel?: boolean | Prisma.NoteRequest$educationLevelArgs<ExtArgs>;
    program?: boolean | Prisma.NoteRequest$programArgs<ExtArgs>;
    subject?: boolean | Prisma.NoteRequest$subjectArgs<ExtArgs>;
    topic?: boolean | Prisma.NoteRequest$topicArgs<ExtArgs>;
};
export type NoteRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    educationLevel?: boolean | Prisma.NoteRequest$educationLevelArgs<ExtArgs>;
    program?: boolean | Prisma.NoteRequest$programArgs<ExtArgs>;
    subject?: boolean | Prisma.NoteRequest$subjectArgs<ExtArgs>;
    topic?: boolean | Prisma.NoteRequest$topicArgs<ExtArgs>;
};
export type NoteRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    educationLevel?: boolean | Prisma.NoteRequest$educationLevelArgs<ExtArgs>;
    program?: boolean | Prisma.NoteRequest$programArgs<ExtArgs>;
    subject?: boolean | Prisma.NoteRequest$subjectArgs<ExtArgs>;
    topic?: boolean | Prisma.NoteRequest$topicArgs<ExtArgs>;
};
export type $NoteRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "NoteRequest";
    objects: {
        educationLevel: Prisma.$EducationLevelPayload<ExtArgs> | null;
        program: Prisma.$ProgramPayload<ExtArgs> | null;
        subject: Prisma.$SubjectPayload<ExtArgs> | null;
        topic: Prisma.$TopicPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        email: string;
        message: string;
        educationLevelId: string | null;
        programId: string | null;
        subjectId: string | null;
        topicId: string | null;
        status: $Enums.NoteRequestStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["noteRequest"]>;
    composites: {};
};
export type NoteRequestGetPayload<S extends boolean | null | undefined | NoteRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload, S>;
export type NoteRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NoteRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NoteRequestCountAggregateInputType | true;
};
export interface NoteRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['NoteRequest'];
        meta: {
            name: 'NoteRequest';
        };
    };
    /**
     * Find zero or one NoteRequest that matches the filter.
     * @param {NoteRequestFindUniqueArgs} args - Arguments to find a NoteRequest
     * @example
     * // Get one NoteRequest
     * const noteRequest = await prisma.noteRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoteRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, NoteRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NoteRequestClient<runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one NoteRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NoteRequestFindUniqueOrThrowArgs} args - Arguments to find a NoteRequest
     * @example
     * // Get one NoteRequest
     * const noteRequest = await prisma.noteRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoteRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NoteRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NoteRequestClient<runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first NoteRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteRequestFindFirstArgs} args - Arguments to find a NoteRequest
     * @example
     * // Get one NoteRequest
     * const noteRequest = await prisma.noteRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoteRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, NoteRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__NoteRequestClient<runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first NoteRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteRequestFindFirstOrThrowArgs} args - Arguments to find a NoteRequest
     * @example
     * // Get one NoteRequest
     * const noteRequest = await prisma.noteRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoteRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NoteRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NoteRequestClient<runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more NoteRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NoteRequests
     * const noteRequests = await prisma.noteRequest.findMany()
     *
     * // Get first 10 NoteRequests
     * const noteRequests = await prisma.noteRequest.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const noteRequestWithIdOnly = await prisma.noteRequest.findMany({ select: { id: true } })
     *
     */
    findMany<T extends NoteRequestFindManyArgs>(args?: Prisma.SelectSubset<T, NoteRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a NoteRequest.
     * @param {NoteRequestCreateArgs} args - Arguments to create a NoteRequest.
     * @example
     * // Create one NoteRequest
     * const NoteRequest = await prisma.noteRequest.create({
     *   data: {
     *     // ... data to create a NoteRequest
     *   }
     * })
     *
     */
    create<T extends NoteRequestCreateArgs>(args: Prisma.SelectSubset<T, NoteRequestCreateArgs<ExtArgs>>): Prisma.Prisma__NoteRequestClient<runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many NoteRequests.
     * @param {NoteRequestCreateManyArgs} args - Arguments to create many NoteRequests.
     * @example
     * // Create many NoteRequests
     * const noteRequest = await prisma.noteRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends NoteRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, NoteRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many NoteRequests and returns the data saved in the database.
     * @param {NoteRequestCreateManyAndReturnArgs} args - Arguments to create many NoteRequests.
     * @example
     * // Create many NoteRequests
     * const noteRequest = await prisma.noteRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many NoteRequests and only return the `id`
     * const noteRequestWithIdOnly = await prisma.noteRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends NoteRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NoteRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a NoteRequest.
     * @param {NoteRequestDeleteArgs} args - Arguments to delete one NoteRequest.
     * @example
     * // Delete one NoteRequest
     * const NoteRequest = await prisma.noteRequest.delete({
     *   where: {
     *     // ... filter to delete one NoteRequest
     *   }
     * })
     *
     */
    delete<T extends NoteRequestDeleteArgs>(args: Prisma.SelectSubset<T, NoteRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__NoteRequestClient<runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one NoteRequest.
     * @param {NoteRequestUpdateArgs} args - Arguments to update one NoteRequest.
     * @example
     * // Update one NoteRequest
     * const noteRequest = await prisma.noteRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends NoteRequestUpdateArgs>(args: Prisma.SelectSubset<T, NoteRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__NoteRequestClient<runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more NoteRequests.
     * @param {NoteRequestDeleteManyArgs} args - Arguments to filter NoteRequests to delete.
     * @example
     * // Delete a few NoteRequests
     * const { count } = await prisma.noteRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends NoteRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, NoteRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more NoteRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NoteRequests
     * const noteRequest = await prisma.noteRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends NoteRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, NoteRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more NoteRequests and returns the data updated in the database.
     * @param {NoteRequestUpdateManyAndReturnArgs} args - Arguments to update many NoteRequests.
     * @example
     * // Update many NoteRequests
     * const noteRequest = await prisma.noteRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more NoteRequests and only return the `id`
     * const noteRequestWithIdOnly = await prisma.noteRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends NoteRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NoteRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one NoteRequest.
     * @param {NoteRequestUpsertArgs} args - Arguments to update or create a NoteRequest.
     * @example
     * // Update or create a NoteRequest
     * const noteRequest = await prisma.noteRequest.upsert({
     *   create: {
     *     // ... data to create a NoteRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NoteRequest we want to update
     *   }
     * })
     */
    upsert<T extends NoteRequestUpsertArgs>(args: Prisma.SelectSubset<T, NoteRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__NoteRequestClient<runtime.Types.Result.GetResult<Prisma.$NoteRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of NoteRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteRequestCountArgs} args - Arguments to filter NoteRequests to count.
     * @example
     * // Count the number of NoteRequests
     * const count = await prisma.noteRequest.count({
     *   where: {
     *     // ... the filter for the NoteRequests we want to count
     *   }
     * })
    **/
    count<T extends NoteRequestCountArgs>(args?: Prisma.Subset<T, NoteRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NoteRequestCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a NoteRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NoteRequestAggregateArgs>(args: Prisma.Subset<T, NoteRequestAggregateArgs>): Prisma.PrismaPromise<GetNoteRequestAggregateType<T>>;
    /**
     * Group by NoteRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteRequestGroupByArgs} args - Group by arguments.
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
    groupBy<T extends NoteRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NoteRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: NoteRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NoteRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoteRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the NoteRequest model
     */
    readonly fields: NoteRequestFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for NoteRequest.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__NoteRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    educationLevel<T extends Prisma.NoteRequest$educationLevelArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NoteRequest$educationLevelArgs<ExtArgs>>): Prisma.Prisma__EducationLevelClient<runtime.Types.Result.GetResult<Prisma.$EducationLevelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    program<T extends Prisma.NoteRequest$programArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NoteRequest$programArgs<ExtArgs>>): Prisma.Prisma__ProgramClient<runtime.Types.Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    subject<T extends Prisma.NoteRequest$subjectArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NoteRequest$subjectArgs<ExtArgs>>): Prisma.Prisma__SubjectClient<runtime.Types.Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    topic<T extends Prisma.NoteRequest$topicArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NoteRequest$topicArgs<ExtArgs>>): Prisma.Prisma__TopicClient<runtime.Types.Result.GetResult<Prisma.$TopicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the NoteRequest model
 */
export interface NoteRequestFieldRefs {
    readonly id: Prisma.FieldRef<"NoteRequest", 'String'>;
    readonly name: Prisma.FieldRef<"NoteRequest", 'String'>;
    readonly email: Prisma.FieldRef<"NoteRequest", 'String'>;
    readonly message: Prisma.FieldRef<"NoteRequest", 'String'>;
    readonly educationLevelId: Prisma.FieldRef<"NoteRequest", 'String'>;
    readonly programId: Prisma.FieldRef<"NoteRequest", 'String'>;
    readonly subjectId: Prisma.FieldRef<"NoteRequest", 'String'>;
    readonly topicId: Prisma.FieldRef<"NoteRequest", 'String'>;
    readonly status: Prisma.FieldRef<"NoteRequest", 'NoteRequestStatus'>;
    readonly createdAt: Prisma.FieldRef<"NoteRequest", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"NoteRequest", 'DateTime'>;
}
/**
 * NoteRequest findUnique
 */
export type NoteRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NoteRequest to fetch.
     */
    where: Prisma.NoteRequestWhereUniqueInput;
};
/**
 * NoteRequest findUniqueOrThrow
 */
export type NoteRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NoteRequest to fetch.
     */
    where: Prisma.NoteRequestWhereUniqueInput;
};
/**
 * NoteRequest findFirst
 */
export type NoteRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NoteRequest to fetch.
     */
    where?: Prisma.NoteRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NoteRequests to fetch.
     */
    orderBy?: Prisma.NoteRequestOrderByWithRelationInput | Prisma.NoteRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for NoteRequests.
     */
    cursor?: Prisma.NoteRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NoteRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NoteRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NoteRequests.
     */
    distinct?: Prisma.NoteRequestScalarFieldEnum | Prisma.NoteRequestScalarFieldEnum[];
};
/**
 * NoteRequest findFirstOrThrow
 */
export type NoteRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NoteRequest to fetch.
     */
    where?: Prisma.NoteRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NoteRequests to fetch.
     */
    orderBy?: Prisma.NoteRequestOrderByWithRelationInput | Prisma.NoteRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for NoteRequests.
     */
    cursor?: Prisma.NoteRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NoteRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NoteRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NoteRequests.
     */
    distinct?: Prisma.NoteRequestScalarFieldEnum | Prisma.NoteRequestScalarFieldEnum[];
};
/**
 * NoteRequest findMany
 */
export type NoteRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NoteRequests to fetch.
     */
    where?: Prisma.NoteRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NoteRequests to fetch.
     */
    orderBy?: Prisma.NoteRequestOrderByWithRelationInput | Prisma.NoteRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing NoteRequests.
     */
    cursor?: Prisma.NoteRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NoteRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NoteRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NoteRequests.
     */
    distinct?: Prisma.NoteRequestScalarFieldEnum | Prisma.NoteRequestScalarFieldEnum[];
};
/**
 * NoteRequest create
 */
export type NoteRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a NoteRequest.
     */
    data: Prisma.XOR<Prisma.NoteRequestCreateInput, Prisma.NoteRequestUncheckedCreateInput>;
};
/**
 * NoteRequest createMany
 */
export type NoteRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many NoteRequests.
     */
    data: Prisma.NoteRequestCreateManyInput | Prisma.NoteRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * NoteRequest createManyAndReturn
 */
export type NoteRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteRequest
     */
    select?: Prisma.NoteRequestSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteRequest
     */
    omit?: Prisma.NoteRequestOmit<ExtArgs> | null;
    /**
     * The data used to create many NoteRequests.
     */
    data: Prisma.NoteRequestCreateManyInput | Prisma.NoteRequestCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * NoteRequest update
 */
export type NoteRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a NoteRequest.
     */
    data: Prisma.XOR<Prisma.NoteRequestUpdateInput, Prisma.NoteRequestUncheckedUpdateInput>;
    /**
     * Choose, which NoteRequest to update.
     */
    where: Prisma.NoteRequestWhereUniqueInput;
};
/**
 * NoteRequest updateMany
 */
export type NoteRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update NoteRequests.
     */
    data: Prisma.XOR<Prisma.NoteRequestUpdateManyMutationInput, Prisma.NoteRequestUncheckedUpdateManyInput>;
    /**
     * Filter which NoteRequests to update
     */
    where?: Prisma.NoteRequestWhereInput;
    /**
     * Limit how many NoteRequests to update.
     */
    limit?: number;
};
/**
 * NoteRequest updateManyAndReturn
 */
export type NoteRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteRequest
     */
    select?: Prisma.NoteRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteRequest
     */
    omit?: Prisma.NoteRequestOmit<ExtArgs> | null;
    /**
     * The data used to update NoteRequests.
     */
    data: Prisma.XOR<Prisma.NoteRequestUpdateManyMutationInput, Prisma.NoteRequestUncheckedUpdateManyInput>;
    /**
     * Filter which NoteRequests to update
     */
    where?: Prisma.NoteRequestWhereInput;
    /**
     * Limit how many NoteRequests to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * NoteRequest upsert
 */
export type NoteRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the NoteRequest to update in case it exists.
     */
    where: Prisma.NoteRequestWhereUniqueInput;
    /**
     * In case the NoteRequest found by the `where` argument doesn't exist, create a new NoteRequest with this data.
     */
    create: Prisma.XOR<Prisma.NoteRequestCreateInput, Prisma.NoteRequestUncheckedCreateInput>;
    /**
     * In case the NoteRequest was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.NoteRequestUpdateInput, Prisma.NoteRequestUncheckedUpdateInput>;
};
/**
 * NoteRequest delete
 */
export type NoteRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which NoteRequest to delete.
     */
    where: Prisma.NoteRequestWhereUniqueInput;
};
/**
 * NoteRequest deleteMany
 */
export type NoteRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which NoteRequests to delete
     */
    where?: Prisma.NoteRequestWhereInput;
    /**
     * Limit how many NoteRequests to delete.
     */
    limit?: number;
};
/**
 * NoteRequest.educationLevel
 */
export type NoteRequest$educationLevelArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EducationLevel
     */
    select?: Prisma.EducationLevelSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EducationLevel
     */
    omit?: Prisma.EducationLevelOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EducationLevelInclude<ExtArgs> | null;
    where?: Prisma.EducationLevelWhereInput;
};
/**
 * NoteRequest.program
 */
export type NoteRequest$programArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: Prisma.ProgramSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Program
     */
    omit?: Prisma.ProgramOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProgramInclude<ExtArgs> | null;
    where?: Prisma.ProgramWhereInput;
};
/**
 * NoteRequest.subject
 */
export type NoteRequest$subjectArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * NoteRequest.topic
 */
export type NoteRequest$topicArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topic
     */
    select?: Prisma.TopicSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Topic
     */
    omit?: Prisma.TopicOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TopicInclude<ExtArgs> | null;
    where?: Prisma.TopicWhereInput;
};
/**
 * NoteRequest without action
 */
export type NoteRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
