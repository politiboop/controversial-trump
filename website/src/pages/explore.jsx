import React from 'react';
import Layout from '@theme/Layout';
import ControversyExplorer from '@site/src/components/ControversyExplorer';

export default function ExplorePage() {
  return (
    <Layout
      title="Explore Controversies"
      description="Interactive controversy tracker with filtering and search. Browse Trump controversies by timeline, type, topic, and evidence level.">
      <ControversyExplorer />
    </Layout>
  );
}
