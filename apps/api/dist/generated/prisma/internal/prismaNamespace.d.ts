import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.10.1
 * Query Engine version: d1b3f377ca835d73fd50954a5e22128b9ebdd6b8
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * Resolved type of the argument passed to the `PrismaClient` constructor.
 *
 * When called without a narrower options type (the common case), this resolves
 * to `PrismaClientOptions` directly, which produces a clear TypeScript error
 * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
 * the argument is missing or incomplete. When the user supplies a narrower
 * options type (e.g. via a literal), it falls back to `Subset` to keep
 * filtering out unknown properties.
 */
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | ({
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O) : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly EducationLevel: 'EducationLevel';
    readonly Program: 'Program';
    readonly Subject: 'Subject';
    readonly Topic: 'Topic';
    readonly Note: 'Note';
    readonly NoteResource: 'NoteResource';
    readonly Admin: 'Admin';
    readonly NoteRequest: 'NoteRequest';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "educationLevel" | "program" | "subject" | "topic" | "note" | "noteResource" | "admin" | "noteRequest";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        EducationLevel: {
            payload: Prisma.$EducationLevelPayload<ExtArgs>;
            fields: Prisma.EducationLevelFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EducationLevelFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationLevelPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EducationLevelFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationLevelPayload>;
                };
                findFirst: {
                    args: Prisma.EducationLevelFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationLevelPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EducationLevelFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationLevelPayload>;
                };
                findMany: {
                    args: Prisma.EducationLevelFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationLevelPayload>[];
                };
                create: {
                    args: Prisma.EducationLevelCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationLevelPayload>;
                };
                createMany: {
                    args: Prisma.EducationLevelCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EducationLevelCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationLevelPayload>[];
                };
                delete: {
                    args: Prisma.EducationLevelDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationLevelPayload>;
                };
                update: {
                    args: Prisma.EducationLevelUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationLevelPayload>;
                };
                deleteMany: {
                    args: Prisma.EducationLevelDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EducationLevelUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EducationLevelUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationLevelPayload>[];
                };
                upsert: {
                    args: Prisma.EducationLevelUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationLevelPayload>;
                };
                aggregate: {
                    args: Prisma.EducationLevelAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEducationLevel>;
                };
                groupBy: {
                    args: Prisma.EducationLevelGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EducationLevelGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EducationLevelCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EducationLevelCountAggregateOutputType> | number;
                };
            };
        };
        Program: {
            payload: Prisma.$ProgramPayload<ExtArgs>;
            fields: Prisma.ProgramFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProgramFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProgramFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>;
                };
                findFirst: {
                    args: Prisma.ProgramFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProgramFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>;
                };
                findMany: {
                    args: Prisma.ProgramFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>[];
                };
                create: {
                    args: Prisma.ProgramCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>;
                };
                createMany: {
                    args: Prisma.ProgramCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProgramCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>[];
                };
                delete: {
                    args: Prisma.ProgramDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>;
                };
                update: {
                    args: Prisma.ProgramUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>;
                };
                deleteMany: {
                    args: Prisma.ProgramDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProgramUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProgramUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>[];
                };
                upsert: {
                    args: Prisma.ProgramUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProgramPayload>;
                };
                aggregate: {
                    args: Prisma.ProgramAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProgram>;
                };
                groupBy: {
                    args: Prisma.ProgramGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProgramGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProgramCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProgramCountAggregateOutputType> | number;
                };
            };
        };
        Subject: {
            payload: Prisma.$SubjectPayload<ExtArgs>;
            fields: Prisma.SubjectFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SubjectFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubjectPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SubjectFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubjectPayload>;
                };
                findFirst: {
                    args: Prisma.SubjectFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubjectPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SubjectFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubjectPayload>;
                };
                findMany: {
                    args: Prisma.SubjectFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubjectPayload>[];
                };
                create: {
                    args: Prisma.SubjectCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubjectPayload>;
                };
                createMany: {
                    args: Prisma.SubjectCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SubjectCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubjectPayload>[];
                };
                delete: {
                    args: Prisma.SubjectDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubjectPayload>;
                };
                update: {
                    args: Prisma.SubjectUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubjectPayload>;
                };
                deleteMany: {
                    args: Prisma.SubjectDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SubjectUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SubjectUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubjectPayload>[];
                };
                upsert: {
                    args: Prisma.SubjectUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubjectPayload>;
                };
                aggregate: {
                    args: Prisma.SubjectAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSubject>;
                };
                groupBy: {
                    args: Prisma.SubjectGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubjectGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SubjectCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubjectCountAggregateOutputType> | number;
                };
            };
        };
        Topic: {
            payload: Prisma.$TopicPayload<ExtArgs>;
            fields: Prisma.TopicFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TopicFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopicPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TopicFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopicPayload>;
                };
                findFirst: {
                    args: Prisma.TopicFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopicPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TopicFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopicPayload>;
                };
                findMany: {
                    args: Prisma.TopicFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopicPayload>[];
                };
                create: {
                    args: Prisma.TopicCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopicPayload>;
                };
                createMany: {
                    args: Prisma.TopicCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TopicCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopicPayload>[];
                };
                delete: {
                    args: Prisma.TopicDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopicPayload>;
                };
                update: {
                    args: Prisma.TopicUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopicPayload>;
                };
                deleteMany: {
                    args: Prisma.TopicDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TopicUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TopicUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopicPayload>[];
                };
                upsert: {
                    args: Prisma.TopicUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TopicPayload>;
                };
                aggregate: {
                    args: Prisma.TopicAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTopic>;
                };
                groupBy: {
                    args: Prisma.TopicGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TopicGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TopicCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TopicCountAggregateOutputType> | number;
                };
            };
        };
        Note: {
            payload: Prisma.$NotePayload<ExtArgs>;
            fields: Prisma.NoteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NoteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NoteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotePayload>;
                };
                findFirst: {
                    args: Prisma.NoteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NoteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotePayload>;
                };
                findMany: {
                    args: Prisma.NoteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotePayload>[];
                };
                create: {
                    args: Prisma.NoteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotePayload>;
                };
                createMany: {
                    args: Prisma.NoteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NoteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotePayload>[];
                };
                delete: {
                    args: Prisma.NoteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotePayload>;
                };
                update: {
                    args: Prisma.NoteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotePayload>;
                };
                deleteMany: {
                    args: Prisma.NoteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NoteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NoteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotePayload>[];
                };
                upsert: {
                    args: Prisma.NoteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotePayload>;
                };
                aggregate: {
                    args: Prisma.NoteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNote>;
                };
                groupBy: {
                    args: Prisma.NoteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NoteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NoteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NoteCountAggregateOutputType> | number;
                };
            };
        };
        NoteResource: {
            payload: Prisma.$NoteResourcePayload<ExtArgs>;
            fields: Prisma.NoteResourceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NoteResourceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteResourcePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NoteResourceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteResourcePayload>;
                };
                findFirst: {
                    args: Prisma.NoteResourceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteResourcePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NoteResourceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteResourcePayload>;
                };
                findMany: {
                    args: Prisma.NoteResourceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteResourcePayload>[];
                };
                create: {
                    args: Prisma.NoteResourceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteResourcePayload>;
                };
                createMany: {
                    args: Prisma.NoteResourceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NoteResourceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteResourcePayload>[];
                };
                delete: {
                    args: Prisma.NoteResourceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteResourcePayload>;
                };
                update: {
                    args: Prisma.NoteResourceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteResourcePayload>;
                };
                deleteMany: {
                    args: Prisma.NoteResourceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NoteResourceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NoteResourceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteResourcePayload>[];
                };
                upsert: {
                    args: Prisma.NoteResourceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteResourcePayload>;
                };
                aggregate: {
                    args: Prisma.NoteResourceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNoteResource>;
                };
                groupBy: {
                    args: Prisma.NoteResourceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NoteResourceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NoteResourceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NoteResourceCountAggregateOutputType> | number;
                };
            };
        };
        Admin: {
            payload: Prisma.$AdminPayload<ExtArgs>;
            fields: Prisma.AdminFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AdminFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                findFirst: {
                    args: Prisma.AdminFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                findMany: {
                    args: Prisma.AdminFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>[];
                };
                create: {
                    args: Prisma.AdminCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                createMany: {
                    args: Prisma.AdminCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>[];
                };
                delete: {
                    args: Prisma.AdminDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                update: {
                    args: Prisma.AdminUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                deleteMany: {
                    args: Prisma.AdminDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AdminUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>[];
                };
                upsert: {
                    args: Prisma.AdminUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminPayload>;
                };
                aggregate: {
                    args: Prisma.AdminAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAdmin>;
                };
                groupBy: {
                    args: Prisma.AdminGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AdminGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AdminCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AdminCountAggregateOutputType> | number;
                };
            };
        };
        NoteRequest: {
            payload: Prisma.$NoteRequestPayload<ExtArgs>;
            fields: Prisma.NoteRequestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NoteRequestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteRequestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NoteRequestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteRequestPayload>;
                };
                findFirst: {
                    args: Prisma.NoteRequestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteRequestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NoteRequestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteRequestPayload>;
                };
                findMany: {
                    args: Prisma.NoteRequestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteRequestPayload>[];
                };
                create: {
                    args: Prisma.NoteRequestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteRequestPayload>;
                };
                createMany: {
                    args: Prisma.NoteRequestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NoteRequestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteRequestPayload>[];
                };
                delete: {
                    args: Prisma.NoteRequestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteRequestPayload>;
                };
                update: {
                    args: Prisma.NoteRequestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteRequestPayload>;
                };
                deleteMany: {
                    args: Prisma.NoteRequestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NoteRequestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NoteRequestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteRequestPayload>[];
                };
                upsert: {
                    args: Prisma.NoteRequestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NoteRequestPayload>;
                };
                aggregate: {
                    args: Prisma.NoteRequestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNoteRequest>;
                };
                groupBy: {
                    args: Prisma.NoteRequestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NoteRequestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NoteRequestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NoteRequestCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const EducationLevelScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly slug: 'slug';
    readonly description: 'description';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type EducationLevelScalarFieldEnum = (typeof EducationLevelScalarFieldEnum)[keyof typeof EducationLevelScalarFieldEnum];
export declare const ProgramScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly slug: 'slug';
    readonly description: 'description';
    readonly educationLevelId: 'educationLevelId';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ProgramScalarFieldEnum = (typeof ProgramScalarFieldEnum)[keyof typeof ProgramScalarFieldEnum];
export declare const SubjectScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly slug: 'slug';
    readonly code: 'code';
    readonly description: 'description';
    readonly programId: 'programId';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type SubjectScalarFieldEnum = (typeof SubjectScalarFieldEnum)[keyof typeof SubjectScalarFieldEnum];
export declare const TopicScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly slug: 'slug';
    readonly description: 'description';
    readonly subjectId: 'subjectId';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type TopicScalarFieldEnum = (typeof TopicScalarFieldEnum)[keyof typeof TopicScalarFieldEnum];
export declare const NoteScalarFieldEnum: {
    readonly id: 'id';
    readonly title: 'title';
    readonly slug: 'slug';
    readonly description: 'description';
    readonly topicId: 'topicId';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type NoteScalarFieldEnum = (typeof NoteScalarFieldEnum)[keyof typeof NoteScalarFieldEnum];
export declare const NoteResourceScalarFieldEnum: {
    readonly id: 'id';
    readonly noteId: 'noteId';
    readonly type: 'type';
    readonly title: 'title';
    readonly url: 'url';
    readonly publicId: 'publicId';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type NoteResourceScalarFieldEnum = (typeof NoteResourceScalarFieldEnum)[keyof typeof NoteResourceScalarFieldEnum];
export declare const AdminScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly email: 'email';
    readonly passwordHash: 'passwordHash';
    readonly isActive: 'isActive';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
    readonly lastLoginAt: 'lastLoginAt';
};
export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum];
export declare const NoteRequestScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly email: 'email';
    readonly message: 'message';
    readonly educationLevelId: 'educationLevelId';
    readonly programId: 'programId';
    readonly subjectId: 'subjectId';
    readonly topicId: 'topicId';
    readonly status: 'status';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type NoteRequestScalarFieldEnum = (typeof NoteRequestScalarFieldEnum)[keyof typeof NoteRequestScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'NoteResourceType'
 */
export type EnumNoteResourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NoteResourceType'>;
/**
 * Reference to a field of type 'NoteResourceType[]'
 */
export type ListEnumNoteResourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NoteResourceType[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'NoteRequestStatus'
 */
export type EnumNoteRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NoteRequestStatus'>;
/**
 * Reference to a field of type 'NoteRequestStatus[]'
 */
export type ListEnumNoteRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NoteRequestStatus[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
/**
 * Options common to all variants of `PrismaClientOptions`, regardless of whether you connect to your database through a driver adapter or through Prisma Accelerate.
 */
export interface PrismaClientBaseOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
    /**
     * Optional maximum size for the query plan cache. If not provided, a default size will be used.
     * A value of `0` can be used to disable the cache entirely. A higher cache size can improve
     * performance for applications that execute a large number of unique queries, while a smaller
     * cache size can reduce memory usage.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   queryPlanCacheMaxSize: 100,
     * })
     * ```
     */
    queryPlanCacheMaxSize?: number;
}
/**
 * `PrismaClient` options for connecting to your database through Prisma Accelerate instead of a driver adapter.
 *
 * Learn more: https://pris.ly/d/accelerate
 */
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     *
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl: string;
    adapter?: never;
}
/**
 * `PrismaClient` options for connecting to your database through a driver adapter. This is the common case in Prisma 7.
 *
 * Learn more: https://pris.ly/d/driver-adapters
 */
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     *
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     *
     * Learn more: https://pris.ly/d/driver-adapters
     *
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     *
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
/**
 * Options passed to the `PrismaClient` constructor.
 *
 * A driver adapter (or, alternatively, a Prisma Accelerate URL) is **required**. See {@link PrismaClientOptionsWithAdapter} and {@link PrismaClientOptionsWithAccelerateUrl} for the two variants. All other properties live in {@link PrismaClientBaseOptions} and are optional.
 *
 * Learn more about driver adapters: https://pris.ly/d/driver-adapters
 */
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    educationLevel?: Prisma.EducationLevelOmit;
    program?: Prisma.ProgramOmit;
    subject?: Prisma.SubjectOmit;
    topic?: Prisma.TopicOmit;
    note?: Prisma.NoteOmit;
    noteResource?: Prisma.NoteResourceOmit;
    admin?: Prisma.AdminOmit;
    noteRequest?: Prisma.NoteRequestOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
