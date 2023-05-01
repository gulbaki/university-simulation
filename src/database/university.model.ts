import {
  Connection,
  Document,
  Model,
  ObjectId,
  Schema,
  SchemaTypes,
} from 'mongoose';
import { Student } from './student.model';

interface University extends Document {
  readonly name: string;
  readonly city: string;
  readonly quota: string;
  readonly students?: Partial<Student>;
}

type UniversityModel = Model<University>;

const UniversitySchema = new Schema<University>(
  {
    name: SchemaTypes.String,
    city: SchemaTypes.String,
    quota: SchemaTypes.String,
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        validate: {
          validator: function (v, x, z) {
            return this.students.length <= 5;
          },
          message: (props) => `${props.value} exceeds maximum array size (5)!`,
        },
      },
    ],
  },
  { timestamps: true, suppressReservedKeysWarning: true },
);

const createUniversityModel: (conn: Connection) => UniversityModel = (
  conn: Connection,
) => conn.model<University>('University', UniversitySchema, 'universities');

export { University, UniversityModel, createUniversityModel };
