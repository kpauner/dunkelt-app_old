import Head from "next/head";

type MetaProps = {
  title?: string;
  description?: string;
  // Add other meta properties as needed
};

const Meta = ({
  title = "Default Title",
  description = "Default description",
}: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Add other meta tags as needed */}
    </Head>
  );
};

export default Meta;
