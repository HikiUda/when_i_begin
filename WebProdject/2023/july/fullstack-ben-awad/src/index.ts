import { MikroORM } from '@mikro-orm/postgresql';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import microConfing from './mikro-orm.config';

const main = async () => {
   const orm = await MikroORM.init(microConfing);

   await orm.getMigrator().up();

   // const post = orm.em.create(Post, {
   //    title: 'my first post',
   //    createdAt: '',
   //    updatedAt: '',
   // });

   // await orm.em.persistAndFlush(post);

   const posts = await orm.em.find(Post, {});
};

main().catch((err) => {
   console.error(err);
});
