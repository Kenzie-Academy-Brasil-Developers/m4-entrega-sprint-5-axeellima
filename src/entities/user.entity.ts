import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  JoinTable,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Schedule } from "./schedule.entity";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isAdm: boolean;

  @Column()
  isActive: boolean;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @OneToMany((type) => Schedule, (schedule) => schedule.property)
  @JoinTable()
  schedules: Schedule;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.isActive) {
      this.isActive = true;
    }
    if (!this.createdAt) {
      this.createdAt = Date();
    }
    if (!this.updatedAt) {
      this.updatedAt = Date();
    }
  }
}
