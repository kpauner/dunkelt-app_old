import { useTranslations } from "next-intl";
// import { Item } from '../db/schema/items';

type ItemProps = {
  item: any;
};

export default function Item({ item }: ItemProps) {
  const t = useTranslations("tags");

  const tagIds = item.tags ? item.tags.split(",") : [];

  const tags = tagIds.map((tagId: string) => ({
    id: tagId,
    description: t(`tags.${tagId}.description`),
  }));

  // console.log(t("messy.description"));
  console.log(t.raw("messy.description"));

  return (
    <div>
      {JSON.stringify(t)}
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <ul>
        {tags.map((tag: any) => (
          <li key={tag.id} title={tag.description}>
            {tag.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
