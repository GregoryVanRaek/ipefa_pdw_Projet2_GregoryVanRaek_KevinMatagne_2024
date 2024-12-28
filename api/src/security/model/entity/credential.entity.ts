import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Credential {
  @PrimaryColumn('varchar', { length:26 })
  credential_id: string;

  @Column({nullable: false, unique: true})
  username: string;

  @Exclude({toPlainOnly:true})
  @Column({nullable: true})
  password: string;

  @Column({nullable: false, unique: true})
  mail: string;

  @Exclude({toPlainOnly:true})
  @Column({default: true})
  active: boolean;

  @Exclude({toPlainOnly:true})
  @CreateDateColumn()
  created: Date;

  @Exclude({toPlainOnly:true})
  @UpdateDateColumn()
  updated: Date;
}