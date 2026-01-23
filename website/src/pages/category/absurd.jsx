import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory } from '@docusaurus/router';
import CategoryPage from '../../components/Category/CategoryPage';
import ControversyDetail from '../../components/Detail/ControversyDetail';

export default function Absurd() {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();
  const [selectedControversy, setSelectedControversy] = useState(null);

  const handleBack = () => {
    history.push(siteConfig.baseUrl);
  };

  const handleControversyClick = (controversy) => {
    setSelectedControversy(controversy);
  };

  const handleCloseDetail = () => {
    setSelectedControversy(null);
  };

  return (
    <Layout title="The Absurd Moments" description="Absurd controversies">
      <CategoryPage
        categoryId="absurd"
        onControversyClick={handleControversyClick}
        onBack={handleBack}
      />

      {selectedControversy && (
        <ControversyDetail controversy={selectedControversy} onClose={handleCloseDetail} />
      )}
    </Layout>
  );
}
