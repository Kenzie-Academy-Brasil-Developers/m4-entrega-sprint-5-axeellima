import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity()
export class Schedule {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("date", { nullable: false })
  date: string;

  @Column("time", { nullable: false })
  hour: string;

  @ManyToOne((type) => Properties, (properties) => properties.schedules, {
    nullable: true,
  })
  @JoinColumn()
  property: Properties;

  @ManyToOne((type) => User, (user) => user.id, { nullable: false })
  @JoinColumn()
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
