import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model NoteResource
 *
 */
export type NoteResourceModel = runtime.Types.Result.DefaultSelection<Prisma.$NoteResourcePayload>;
export type AggregateNoteResource = {
    _count: NoteResourceCountAggregateOutputType | null;
    _min: NoteResourceMinAggregateOutputType | null;
    _max: NoteResourceMaxAggregateOutputType | null;
};
export type NoteResourceMinAggregateOutputType = {
    id: string | null;
    noteId: string | null;
    type: $Enums.NoteResourceType | null;
    title: string | null;
    url: string | null;
    publicId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NoteResourceMaxAggregateOutputType = {
    id: string | null;
    noteId: string | null;
    type: $Enums.NoteResourceType | null;
    title: string | null;
    url: string | null;
    publicId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type NoteResourceCountAggregateOutputType = {
    id: number;
    noteId: number;
    type: number;
    title: number;
    url: number;
    publicId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type NoteResourceMinAggregateInputType = {
    id?: true;
    noteId?: true;
    type?: true;
    title?: true;
    url?: true;
    publicId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NoteResourceMaxAggregateInputType = {
    id?: true;
    noteId?: true;
    type?: true;
    title?: true;
    url?: true;
    publicId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type NoteResourceCountAggregateInputType = {
    id?: true;
    noteId?: true;
    type?: true;
    title?: true;
    url?: true;
    publicId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type NoteResourceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which NoteResource to aggregate.
     */
    where?: Prisma.NoteResourceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NoteResources to fetch.
     */
    orderBy?: Prisma.NoteResourceOrderByWithRelationInput | Prisma.NoteResourceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.NoteResourceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NoteResources from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NoteResources.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned NoteResources
    **/
    _count?: true | NoteResourceCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: NoteResourceMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: NoteResourceMaxAggregateInputType;
};
export type GetNoteResourceAggregateType<T extends NoteResourceAggregateArgs> = {
    [P in keyof T & keyof AggregateNoteResource]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNoteResource[P]> : Prisma.GetScalarType<T[P], AggregateNoteResource[P]>;
};
export type NoteResourceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NoteResourceWhereInput;
    orderBy?: Prisma.NoteResourceOrderByWithAggregationInput | Prisma.NoteResourceOrderByWithAggregationInput[];
    by: Prisma.NoteResourceScalarFieldEnum[] | Prisma.NoteResourceScalarFieldEnum;
    having?: Prisma.NoteResourceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NoteResourceCountAggregateInputType | true;
    _min?: NoteResourceMinAggregateInputType;
    _max?: NoteResourceMaxAggregateInputType;
};
export type NoteResourceGroupByOutputType = {
    id: string;
    noteId: string;
    type: $Enums.NoteResourceType;
    title: string | null;
    url: string;
    publicId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: NoteResourceCountAggregateOutputType | null;
    _min: NoteResourceMinAggregateOutputType | null;
    _max: NoteResourceMaxAggregateOutputType | null;
};
export type GetNoteResourceGroupByPayload<T extends NoteResourceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NoteResourceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NoteResourceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NoteResourceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NoteResourceGroupByOutputType[P]>;
}>>;
export type NoteResourceWhereInput = {
    AND?: Prisma.NoteResourceWhereInput | Prisma.NoteResourceWhereInput[];
    OR?: Prisma.NoteResourceWhereInput[];
    NOT?: Prisma.NoteResourceWhereInput | Prisma.NoteResourceWhereInput[];
    id?: Prisma.StringFilter<"NoteResource"> | string;
    noteId?: Prisma.StringFilter<"NoteResource"> | string;
    type?: Prisma.EnumNoteResourceTypeFilter<"NoteResource"> | $Enums.NoteResourceType;
    title?: Prisma.StringNullableFilter<"NoteResource"> | string | null;
    url?: Prisma.StringFilter<"NoteResource"> | string;
    publicId?: Prisma.StringNullableFilter<"NoteResource"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"NoteResource"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NoteResource"> | Date | string;
    note?: Prisma.XOR<Prisma.NoteScalarRelationFilter, Prisma.NoteWhereInput>;
};
export type NoteResourceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    noteId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    url?: Prisma.SortOrder;
    publicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    note?: Prisma.NoteOrderByWithRelationInput;
};
export type NoteResourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.NoteResourceWhereInput | Prisma.NoteResourceWhereInput[];
    OR?: Prisma.NoteResourceWhereInput[];
    NOT?: Prisma.NoteResourceWhereInput | Prisma.NoteResourceWhereInput[];
    noteId?: Prisma.StringFilter<"NoteResource"> | string;
    type?: Prisma.EnumNoteResourceTypeFilter<"NoteResource"> | $Enums.NoteResourceType;
    title?: Prisma.StringNullableFilter<"NoteResource"> | string | null;
    url?: Prisma.StringFilter<"NoteResource"> | string;
    publicId?: Prisma.StringNullableFilter<"NoteResource"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"NoteResource"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NoteResource"> | Date | string;
    note?: Prisma.XOR<Prisma.NoteScalarRelationFilter, Prisma.NoteWhereInput>;
}, "id">;
export type NoteResourceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    noteId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    url?: Prisma.SortOrder;
    publicId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.NoteResourceCountOrderByAggregateInput;
    _max?: Prisma.NoteResourceMaxOrderByAggregateInput;
    _min?: Prisma.NoteResourceMinOrderByAggregateInput;
};
export type NoteResourceScalarWhereWithAggregatesInput = {
    AND?: Prisma.NoteResourceScalarWhereWithAggregatesInput | Prisma.NoteResourceScalarWhereWithAggregatesInput[];
    OR?: Prisma.NoteResourceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NoteResourceScalarWhereWithAggregatesInput | Prisma.NoteResourceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"NoteResource"> | string;
    noteId?: Prisma.StringWithAggregatesFilter<"NoteResource"> | string;
    type?: Prisma.EnumNoteResourceTypeWithAggregatesFilter<"NoteResource"> | $Enums.NoteResourceType;
    title?: Prisma.StringNullableWithAggregatesFilter<"NoteResource"> | string | null;
    url?: Prisma.StringWithAggregatesFilter<"NoteResource"> | string;
    publicId?: Prisma.StringNullableWithAggregatesFilter<"NoteResource"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"NoteResource"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"NoteResource"> | Date | string;
};
export type NoteResourceCreateInput = {
    id?: string;
    type: $Enums.NoteResourceType;
    title?: string | null;
    url: string;
    publicId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    note: Prisma.NoteCreateNestedOneWithoutResourcesInput;
};
export type NoteResourceUncheckedCreateInput = {
    id?: string;
    noteId: string;
    type: $Enums.NoteResourceType;
    title?: string | null;
    url: string;
    publicId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteResourceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNoteResourceTypeFieldUpdateOperationsInput | $Enums.NoteResourceType;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NoteUpdateOneRequiredWithoutResourcesNestedInput;
};
export type NoteResourceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    noteId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNoteResourceTypeFieldUpdateOperationsInput | $Enums.NoteResourceType;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteResourceCreateManyInput = {
    id?: string;
    noteId: string;
    type: $Enums.NoteResourceType;
    title?: string | null;
    url: string;
    publicId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteResourceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNoteResourceTypeFieldUpdateOperationsInput | $Enums.NoteResourceType;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteResourceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    noteId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNoteResourceTypeFieldUpdateOperationsInput | $Enums.NoteResourceType;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteResourceListRelationFilter = {
    every?: Prisma.NoteResourceWhereInput;
    some?: Prisma.NoteResourceWhereInput;
    none?: Prisma.NoteResourceWhereInput;
};
export type NoteResourceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NoteResourceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    noteId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NoteResourceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    noteId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NoteResourceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    noteId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    publicId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type NoteResourceCreateNestedManyWithoutNoteInput = {
    create?: Prisma.XOR<Prisma.NoteResourceCreateWithoutNoteInput, Prisma.NoteResourceUncheckedCreateWithoutNoteInput> | Prisma.NoteResourceCreateWithoutNoteInput[] | Prisma.NoteResourceUncheckedCreateWithoutNoteInput[];
    connectOrCreate?: Prisma.NoteResourceCreateOrConnectWithoutNoteInput | Prisma.NoteResourceCreateOrConnectWithoutNoteInput[];
    createMany?: Prisma.NoteResourceCreateManyNoteInputEnvelope;
    connect?: Prisma.NoteResourceWhereUniqueInput | Prisma.NoteResourceWhereUniqueInput[];
};
export type NoteResourceUncheckedCreateNestedManyWithoutNoteInput = {
    create?: Prisma.XOR<Prisma.NoteResourceCreateWithoutNoteInput, Prisma.NoteResourceUncheckedCreateWithoutNoteInput> | Prisma.NoteResourceCreateWithoutNoteInput[] | Prisma.NoteResourceUncheckedCreateWithoutNoteInput[];
    connectOrCreate?: Prisma.NoteResourceCreateOrConnectWithoutNoteInput | Prisma.NoteResourceCreateOrConnectWithoutNoteInput[];
    createMany?: Prisma.NoteResourceCreateManyNoteInputEnvelope;
    connect?: Prisma.NoteResourceWhereUniqueInput | Prisma.NoteResourceWhereUniqueInput[];
};
export type NoteResourceUpdateManyWithoutNoteNestedInput = {
    create?: Prisma.XOR<Prisma.NoteResourceCreateWithoutNoteInput, Prisma.NoteResourceUncheckedCreateWithoutNoteInput> | Prisma.NoteResourceCreateWithoutNoteInput[] | Prisma.NoteResourceUncheckedCreateWithoutNoteInput[];
    connectOrCreate?: Prisma.NoteResourceCreateOrConnectWithoutNoteInput | Prisma.NoteResourceCreateOrConnectWithoutNoteInput[];
    upsert?: Prisma.NoteResourceUpsertWithWhereUniqueWithoutNoteInput | Prisma.NoteResourceUpsertWithWhereUniqueWithoutNoteInput[];
    createMany?: Prisma.NoteResourceCreateManyNoteInputEnvelope;
    set?: Prisma.NoteResourceWhereUniqueInput | Prisma.NoteResourceWhereUniqueInput[];
    disconnect?: Prisma.NoteResourceWhereUniqueInput | Prisma.NoteResourceWhereUniqueInput[];
    delete?: Prisma.NoteResourceWhereUniqueInput | Prisma.NoteResourceWhereUniqueInput[];
    connect?: Prisma.NoteResourceWhereUniqueInput | Prisma.NoteResourceWhereUniqueInput[];
    update?: Prisma.NoteResourceUpdateWithWhereUniqueWithoutNoteInput | Prisma.NoteResourceUpdateWithWhereUniqueWithoutNoteInput[];
    updateMany?: Prisma.NoteResourceUpdateManyWithWhereWithoutNoteInput | Prisma.NoteResourceUpdateManyWithWhereWithoutNoteInput[];
    deleteMany?: Prisma.NoteResourceScalarWhereInput | Prisma.NoteResourceScalarWhereInput[];
};
export type NoteResourceUncheckedUpdateManyWithoutNoteNestedInput = {
    create?: Prisma.XOR<Prisma.NoteResourceCreateWithoutNoteInput, Prisma.NoteResourceUncheckedCreateWithoutNoteInput> | Prisma.NoteResourceCreateWithoutNoteInput[] | Prisma.NoteResourceUncheckedCreateWithoutNoteInput[];
    connectOrCreate?: Prisma.NoteResourceCreateOrConnectWithoutNoteInput | Prisma.NoteResourceCreateOrConnectWithoutNoteInput[];
    upsert?: Prisma.NoteResourceUpsertWithWhereUniqueWithoutNoteInput | Prisma.NoteResourceUpsertWithWhereUniqueWithoutNoteInput[];
    createMany?: Prisma.NoteResourceCreateManyNoteInputEnvelope;
    set?: Prisma.NoteResourceWhereUniqueInput | Prisma.NoteResourceWhereUniqueInput[];
    disconnect?: Prisma.NoteResourceWhereUniqueInput | Prisma.NoteResourceWhereUniqueInput[];
    delete?: Prisma.NoteResourceWhereUniqueInput | Prisma.NoteResourceWhereUniqueInput[];
    connect?: Prisma.NoteResourceWhereUniqueInput | Prisma.NoteResourceWhereUniqueInput[];
    update?: Prisma.NoteResourceUpdateWithWhereUniqueWithoutNoteInput | Prisma.NoteResourceUpdateWithWhereUniqueWithoutNoteInput[];
    updateMany?: Prisma.NoteResourceUpdateManyWithWhereWithoutNoteInput | Prisma.NoteResourceUpdateManyWithWhereWithoutNoteInput[];
    deleteMany?: Prisma.NoteResourceScalarWhereInput | Prisma.NoteResourceScalarWhereInput[];
};
export type EnumNoteResourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.NoteResourceType;
};
export type NoteResourceCreateWithoutNoteInput = {
    id?: string;
    type: $Enums.NoteResourceType;
    title?: string | null;
    url: string;
    publicId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteResourceUncheckedCreateWithoutNoteInput = {
    id?: string;
    type: $Enums.NoteResourceType;
    title?: string | null;
    url: string;
    publicId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteResourceCreateOrConnectWithoutNoteInput = {
    where: Prisma.NoteResourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.NoteResourceCreateWithoutNoteInput, Prisma.NoteResourceUncheckedCreateWithoutNoteInput>;
};
export type NoteResourceCreateManyNoteInputEnvelope = {
    data: Prisma.NoteResourceCreateManyNoteInput | Prisma.NoteResourceCreateManyNoteInput[];
    skipDuplicates?: boolean;
};
export type NoteResourceUpsertWithWhereUniqueWithoutNoteInput = {
    where: Prisma.NoteResourceWhereUniqueInput;
    update: Prisma.XOR<Prisma.NoteResourceUpdateWithoutNoteInput, Prisma.NoteResourceUncheckedUpdateWithoutNoteInput>;
    create: Prisma.XOR<Prisma.NoteResourceCreateWithoutNoteInput, Prisma.NoteResourceUncheckedCreateWithoutNoteInput>;
};
export type NoteResourceUpdateWithWhereUniqueWithoutNoteInput = {
    where: Prisma.NoteResourceWhereUniqueInput;
    data: Prisma.XOR<Prisma.NoteResourceUpdateWithoutNoteInput, Prisma.NoteResourceUncheckedUpdateWithoutNoteInput>;
};
export type NoteResourceUpdateManyWithWhereWithoutNoteInput = {
    where: Prisma.NoteResourceScalarWhereInput;
    data: Prisma.XOR<Prisma.NoteResourceUpdateManyMutationInput, Prisma.NoteResourceUncheckedUpdateManyWithoutNoteInput>;
};
export type NoteResourceScalarWhereInput = {
    AND?: Prisma.NoteResourceScalarWhereInput | Prisma.NoteResourceScalarWhereInput[];
    OR?: Prisma.NoteResourceScalarWhereInput[];
    NOT?: Prisma.NoteResourceScalarWhereInput | Prisma.NoteResourceScalarWhereInput[];
    id?: Prisma.StringFilter<"NoteResource"> | string;
    noteId?: Prisma.StringFilter<"NoteResource"> | string;
    type?: Prisma.EnumNoteResourceTypeFilter<"NoteResource"> | $Enums.NoteResourceType;
    title?: Prisma.StringNullableFilter<"NoteResource"> | string | null;
    url?: Prisma.StringFilter<"NoteResource"> | string;
    publicId?: Prisma.StringNullableFilter<"NoteResource"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"NoteResource"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"NoteResource"> | Date | string;
};
export type NoteResourceCreateManyNoteInput = {
    id?: string;
    type: $Enums.NoteResourceType;
    title?: string | null;
    url: string;
    publicId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type NoteResourceUpdateWithoutNoteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNoteResourceTypeFieldUpdateOperationsInput | $Enums.NoteResourceType;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteResourceUncheckedUpdateWithoutNoteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNoteResourceTypeFieldUpdateOperationsInput | $Enums.NoteResourceType;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteResourceUncheckedUpdateManyWithoutNoteInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumNoteResourceTypeFieldUpdateOperationsInput | $Enums.NoteResourceType;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    publicId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NoteResourceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    noteId?: boolean;
    type?: boolean;
    title?: boolean;
    url?: boolean;
    publicId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    note?: boolean | Prisma.NoteDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["noteResource"]>;
export type NoteResourceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    noteId?: boolean;
    type?: boolean;
    title?: boolean;
    url?: boolean;
    publicId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    note?: boolean | Prisma.NoteDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["noteResource"]>;
export type NoteResourceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    noteId?: boolean;
    type?: boolean;
    title?: boolean;
    url?: boolean;
    publicId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    note?: boolean | Prisma.NoteDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["noteResource"]>;
export type NoteResourceSelectScalar = {
    id?: boolean;
    noteId?: boolean;
    type?: boolean;
    title?: boolean;
    url?: boolean;
    publicId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type NoteResourceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "noteId" | "type" | "title" | "url" | "publicId" | "createdAt" | "updatedAt", ExtArgs["result"]["noteResource"]>;
export type NoteResourceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    note?: boolean | Prisma.NoteDefaultArgs<ExtArgs>;
};
export type NoteResourceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    note?: boolean | Prisma.NoteDefaultArgs<ExtArgs>;
};
export type NoteResourceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    note?: boolean | Prisma.NoteDefaultArgs<ExtArgs>;
};
export type $NoteResourcePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "NoteResource";
    objects: {
        note: Prisma.$NotePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        noteId: string;
        type: $Enums.NoteResourceType;
        title: string | null;
        url: string;
        publicId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["noteResource"]>;
    composites: {};
};
export type NoteResourceGetPayload<S extends boolean | null | undefined | NoteResourceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NoteResourcePayload, S>;
export type NoteResourceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NoteResourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NoteResourceCountAggregateInputType | true;
};
export interface NoteResourceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['NoteResource'];
        meta: {
            name: 'NoteResource';
        };
    };
    /**
     * Find zero or one NoteResource that matches the filter.
     * @param {NoteResourceFindUniqueArgs} args - Arguments to find a NoteResource
     * @example
     * // Get one NoteResource
     * const noteResource = await prisma.noteResource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoteResourceFindUniqueArgs>(args: Prisma.SelectSubset<T, NoteResourceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NoteResourceClient<runtime.Types.Result.GetResult<Prisma.$NoteResourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one NoteResource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NoteResourceFindUniqueOrThrowArgs} args - Arguments to find a NoteResource
     * @example
     * // Get one NoteResource
     * const noteResource = await prisma.noteResource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoteResourceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NoteResourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NoteResourceClient<runtime.Types.Result.GetResult<Prisma.$NoteResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first NoteResource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteResourceFindFirstArgs} args - Arguments to find a NoteResource
     * @example
     * // Get one NoteResource
     * const noteResource = await prisma.noteResource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoteResourceFindFirstArgs>(args?: Prisma.SelectSubset<T, NoteResourceFindFirstArgs<ExtArgs>>): Prisma.Prisma__NoteResourceClient<runtime.Types.Result.GetResult<Prisma.$NoteResourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first NoteResource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteResourceFindFirstOrThrowArgs} args - Arguments to find a NoteResource
     * @example
     * // Get one NoteResource
     * const noteResource = await prisma.noteResource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoteResourceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NoteResourceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NoteResourceClient<runtime.Types.Result.GetResult<Prisma.$NoteResourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more NoteResources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteResourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NoteResources
     * const noteResources = await prisma.noteResource.findMany()
     *
     * // Get first 10 NoteResources
     * const noteResources = await prisma.noteResource.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const noteResourceWithIdOnly = await prisma.noteResource.findMany({ select: { id: true } })
     *
     */
    findMany<T extends NoteResourceFindManyArgs>(args?: Prisma.SelectSubset<T, NoteResourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NoteResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a NoteResource.
     * @param {NoteResourceCreateArgs} args - Arguments to create a NoteResource.
     * @example
     * // Create one NoteResource
     * const NoteResource = await prisma.noteResource.create({
     *   data: {
     *     // ... data to create a NoteResource
     *   }
     * })
     *
     */
    create<T extends NoteResourceCreateArgs>(args: Prisma.SelectSubset<T, NoteResourceCreateArgs<ExtArgs>>): Prisma.Prisma__NoteResourceClient<runtime.Types.Result.GetResult<Prisma.$NoteResourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many NoteResources.
     * @param {NoteResourceCreateManyArgs} args - Arguments to create many NoteResources.
     * @example
     * // Create many NoteResources
     * const noteResource = await prisma.noteResource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends NoteResourceCreateManyArgs>(args?: Prisma.SelectSubset<T, NoteResourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many NoteResources and returns the data saved in the database.
     * @param {NoteResourceCreateManyAndReturnArgs} args - Arguments to create many NoteResources.
     * @example
     * // Create many NoteResources
     * const noteResource = await prisma.noteResource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many NoteResources and only return the `id`
     * const noteResourceWithIdOnly = await prisma.noteResource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends NoteResourceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NoteResourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NoteResourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a NoteResource.
     * @param {NoteResourceDeleteArgs} args - Arguments to delete one NoteResource.
     * @example
     * // Delete one NoteResource
     * const NoteResource = await prisma.noteResource.delete({
     *   where: {
     *     // ... filter to delete one NoteResource
     *   }
     * })
     *
     */
    delete<T extends NoteResourceDeleteArgs>(args: Prisma.SelectSubset<T, NoteResourceDeleteArgs<ExtArgs>>): Prisma.Prisma__NoteResourceClient<runtime.Types.Result.GetResult<Prisma.$NoteResourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one NoteResource.
     * @param {NoteResourceUpdateArgs} args - Arguments to update one NoteResource.
     * @example
     * // Update one NoteResource
     * const noteResource = await prisma.noteResource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends NoteResourceUpdateArgs>(args: Prisma.SelectSubset<T, NoteResourceUpdateArgs<ExtArgs>>): Prisma.Prisma__NoteResourceClient<runtime.Types.Result.GetResult<Prisma.$NoteResourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more NoteResources.
     * @param {NoteResourceDeleteManyArgs} args - Arguments to filter NoteResources to delete.
     * @example
     * // Delete a few NoteResources
     * const { count } = await prisma.noteResource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends NoteResourceDeleteManyArgs>(args?: Prisma.SelectSubset<T, NoteResourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more NoteResources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteResourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NoteResources
     * const noteResource = await prisma.noteResource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends NoteResourceUpdateManyArgs>(args: Prisma.SelectSubset<T, NoteResourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more NoteResources and returns the data updated in the database.
     * @param {NoteResourceUpdateManyAndReturnArgs} args - Arguments to update many NoteResources.
     * @example
     * // Update many NoteResources
     * const noteResource = await prisma.noteResource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more NoteResources and only return the `id`
     * const noteResourceWithIdOnly = await prisma.noteResource.updateManyAndReturn({
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
    updateManyAndReturn<T extends NoteResourceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NoteResourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NoteResourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one NoteResource.
     * @param {NoteResourceUpsertArgs} args - Arguments to update or create a NoteResource.
     * @example
     * // Update or create a NoteResource
     * const noteResource = await prisma.noteResource.upsert({
     *   create: {
     *     // ... data to create a NoteResource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NoteResource we want to update
     *   }
     * })
     */
    upsert<T extends NoteResourceUpsertArgs>(args: Prisma.SelectSubset<T, NoteResourceUpsertArgs<ExtArgs>>): Prisma.Prisma__NoteResourceClient<runtime.Types.Result.GetResult<Prisma.$NoteResourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of NoteResources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteResourceCountArgs} args - Arguments to filter NoteResources to count.
     * @example
     * // Count the number of NoteResources
     * const count = await prisma.noteResource.count({
     *   where: {
     *     // ... the filter for the NoteResources we want to count
     *   }
     * })
    **/
    count<T extends NoteResourceCountArgs>(args?: Prisma.Subset<T, NoteResourceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NoteResourceCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a NoteResource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteResourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NoteResourceAggregateArgs>(args: Prisma.Subset<T, NoteResourceAggregateArgs>): Prisma.PrismaPromise<GetNoteResourceAggregateType<T>>;
    /**
     * Group by NoteResource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteResourceGroupByArgs} args - Group by arguments.
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
    groupBy<T extends NoteResourceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NoteResourceGroupByArgs['orderBy'];
    } : {
        orderBy?: NoteResourceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NoteResourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoteResourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the NoteResource model
     */
    readonly fields: NoteResourceFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for NoteResource.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__NoteResourceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    note<T extends Prisma.NoteDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.NoteDefaultArgs<ExtArgs>>): Prisma.Prisma__NoteClient<runtime.Types.Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the NoteResource model
 */
export interface NoteResourceFieldRefs {
    readonly id: Prisma.FieldRef<"NoteResource", 'String'>;
    readonly noteId: Prisma.FieldRef<"NoteResource", 'String'>;
    readonly type: Prisma.FieldRef<"NoteResource", 'NoteResourceType'>;
    readonly title: Prisma.FieldRef<"NoteResource", 'String'>;
    readonly url: Prisma.FieldRef<"NoteResource", 'String'>;
    readonly publicId: Prisma.FieldRef<"NoteResource", 'String'>;
    readonly createdAt: Prisma.FieldRef<"NoteResource", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"NoteResource", 'DateTime'>;
}
/**
 * NoteResource findUnique
 */
export type NoteResourceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteResource
     */
    select?: Prisma.NoteResourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteResource
     */
    omit?: Prisma.NoteResourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteResourceInclude<ExtArgs> | null;
    /**
     * Filter, which NoteResource to fetch.
     */
    where: Prisma.NoteResourceWhereUniqueInput;
};
/**
 * NoteResource findUniqueOrThrow
 */
export type NoteResourceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteResource
     */
    select?: Prisma.NoteResourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteResource
     */
    omit?: Prisma.NoteResourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteResourceInclude<ExtArgs> | null;
    /**
     * Filter, which NoteResource to fetch.
     */
    where: Prisma.NoteResourceWhereUniqueInput;
};
/**
 * NoteResource findFirst
 */
export type NoteResourceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteResource
     */
    select?: Prisma.NoteResourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteResource
     */
    omit?: Prisma.NoteResourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteResourceInclude<ExtArgs> | null;
    /**
     * Filter, which NoteResource to fetch.
     */
    where?: Prisma.NoteResourceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NoteResources to fetch.
     */
    orderBy?: Prisma.NoteResourceOrderByWithRelationInput | Prisma.NoteResourceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for NoteResources.
     */
    cursor?: Prisma.NoteResourceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NoteResources from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NoteResources.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NoteResources.
     */
    distinct?: Prisma.NoteResourceScalarFieldEnum | Prisma.NoteResourceScalarFieldEnum[];
};
/**
 * NoteResource findFirstOrThrow
 */
export type NoteResourceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteResource
     */
    select?: Prisma.NoteResourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteResource
     */
    omit?: Prisma.NoteResourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteResourceInclude<ExtArgs> | null;
    /**
     * Filter, which NoteResource to fetch.
     */
    where?: Prisma.NoteResourceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NoteResources to fetch.
     */
    orderBy?: Prisma.NoteResourceOrderByWithRelationInput | Prisma.NoteResourceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for NoteResources.
     */
    cursor?: Prisma.NoteResourceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NoteResources from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NoteResources.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NoteResources.
     */
    distinct?: Prisma.NoteResourceScalarFieldEnum | Prisma.NoteResourceScalarFieldEnum[];
};
/**
 * NoteResource findMany
 */
export type NoteResourceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteResource
     */
    select?: Prisma.NoteResourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteResource
     */
    omit?: Prisma.NoteResourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteResourceInclude<ExtArgs> | null;
    /**
     * Filter, which NoteResources to fetch.
     */
    where?: Prisma.NoteResourceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NoteResources to fetch.
     */
    orderBy?: Prisma.NoteResourceOrderByWithRelationInput | Prisma.NoteResourceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing NoteResources.
     */
    cursor?: Prisma.NoteResourceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NoteResources from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NoteResources.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NoteResources.
     */
    distinct?: Prisma.NoteResourceScalarFieldEnum | Prisma.NoteResourceScalarFieldEnum[];
};
/**
 * NoteResource create
 */
export type NoteResourceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteResource
     */
    select?: Prisma.NoteResourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteResource
     */
    omit?: Prisma.NoteResourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteResourceInclude<ExtArgs> | null;
    /**
     * The data needed to create a NoteResource.
     */
    data: Prisma.XOR<Prisma.NoteResourceCreateInput, Prisma.NoteResourceUncheckedCreateInput>;
};
/**
 * NoteResource createMany
 */
export type NoteResourceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many NoteResources.
     */
    data: Prisma.NoteResourceCreateManyInput | Prisma.NoteResourceCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * NoteResource createManyAndReturn
 */
export type NoteResourceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteResource
     */
    select?: Prisma.NoteResourceSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteResource
     */
    omit?: Prisma.NoteResourceOmit<ExtArgs> | null;
    /**
     * The data used to create many NoteResources.
     */
    data: Prisma.NoteResourceCreateManyInput | Prisma.NoteResourceCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteResourceIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * NoteResource update
 */
export type NoteResourceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteResource
     */
    select?: Prisma.NoteResourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteResource
     */
    omit?: Prisma.NoteResourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteResourceInclude<ExtArgs> | null;
    /**
     * The data needed to update a NoteResource.
     */
    data: Prisma.XOR<Prisma.NoteResourceUpdateInput, Prisma.NoteResourceUncheckedUpdateInput>;
    /**
     * Choose, which NoteResource to update.
     */
    where: Prisma.NoteResourceWhereUniqueInput;
};
/**
 * NoteResource updateMany
 */
export type NoteResourceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update NoteResources.
     */
    data: Prisma.XOR<Prisma.NoteResourceUpdateManyMutationInput, Prisma.NoteResourceUncheckedUpdateManyInput>;
    /**
     * Filter which NoteResources to update
     */
    where?: Prisma.NoteResourceWhereInput;
    /**
     * Limit how many NoteResources to update.
     */
    limit?: number;
};
/**
 * NoteResource updateManyAndReturn
 */
export type NoteResourceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteResource
     */
    select?: Prisma.NoteResourceSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteResource
     */
    omit?: Prisma.NoteResourceOmit<ExtArgs> | null;
    /**
     * The data used to update NoteResources.
     */
    data: Prisma.XOR<Prisma.NoteResourceUpdateManyMutationInput, Prisma.NoteResourceUncheckedUpdateManyInput>;
    /**
     * Filter which NoteResources to update
     */
    where?: Prisma.NoteResourceWhereInput;
    /**
     * Limit how many NoteResources to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteResourceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * NoteResource upsert
 */
export type NoteResourceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteResource
     */
    select?: Prisma.NoteResourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteResource
     */
    omit?: Prisma.NoteResourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteResourceInclude<ExtArgs> | null;
    /**
     * The filter to search for the NoteResource to update in case it exists.
     */
    where: Prisma.NoteResourceWhereUniqueInput;
    /**
     * In case the NoteResource found by the `where` argument doesn't exist, create a new NoteResource with this data.
     */
    create: Prisma.XOR<Prisma.NoteResourceCreateInput, Prisma.NoteResourceUncheckedCreateInput>;
    /**
     * In case the NoteResource was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.NoteResourceUpdateInput, Prisma.NoteResourceUncheckedUpdateInput>;
};
/**
 * NoteResource delete
 */
export type NoteResourceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteResource
     */
    select?: Prisma.NoteResourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteResource
     */
    omit?: Prisma.NoteResourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteResourceInclude<ExtArgs> | null;
    /**
     * Filter which NoteResource to delete.
     */
    where: Prisma.NoteResourceWhereUniqueInput;
};
/**
 * NoteResource deleteMany
 */
export type NoteResourceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which NoteResources to delete
     */
    where?: Prisma.NoteResourceWhereInput;
    /**
     * Limit how many NoteResources to delete.
     */
    limit?: number;
};
/**
 * NoteResource without action
 */
export type NoteResourceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteResource
     */
    select?: Prisma.NoteResourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NoteResource
     */
    omit?: Prisma.NoteResourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NoteResourceInclude<ExtArgs> | null;
};
