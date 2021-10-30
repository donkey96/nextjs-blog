import Link from 'next/link';
import Layout from '../../components/layout';

const FirstPost = () => {
  return (
    <Layout>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
};

export default FirstPost;