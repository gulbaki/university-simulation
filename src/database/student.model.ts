import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { University } from './university.model';
interface Student extends Document {
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly university?: Partial<University>;
  points: number;
}

type StudentModel = Model<Student>;

const StudentSchema = new Schema<Student>(
  {
    name: SchemaTypes.String,
    surname: SchemaTypes.String,
    email: SchemaTypes.String,
    university: { type: SchemaTypes.ObjectId, ref: 'University' },
    points: { type: SchemaTypes.Number, default: 0, index: true },
  },
  { timestamps: true },
);

StudentSchema.methods.getFullName = function() {
  return this.name + this.surname
}


const createStudentModel: (conn: Connection) => StudentModel = (conn: Connection) =>
  conn.model<Student>('Student', StudentSchema, 'students');

export { Student, StudentModel, createStudentModel };
