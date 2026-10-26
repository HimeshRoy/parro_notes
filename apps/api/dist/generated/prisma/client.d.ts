import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more EducationLevels
 * const educationLevels = await prisma.educationLevel.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model EducationLevel
 *
 */
export type EducationLevel = Prisma.EducationLevelModel;
/**
 * Model Program
 *
 */
export type Program = Prisma.ProgramModel;
/**
 * Model Subject
 *
 */
export type Subject = Prisma.SubjectModel;
/**
 * Model Topic
 *
 */
export type Topic = Prisma.TopicModel;
/**
 * Model Note
 *
 */
export type Note = Prisma.NoteModel;
/**
 * Model NoteResource
 *
 */
export type NoteResource = Prisma.NoteResourceModel;
/**
 * Model Admin
 *
 */
export type Admin = Prisma.AdminModel;
/**
 * Model NoteRequest
 *
 */
export type NoteRequest = Prisma.NoteRequestModel;
