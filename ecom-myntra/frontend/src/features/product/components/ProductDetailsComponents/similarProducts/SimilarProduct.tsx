import React from 'react';
import styles from './SimilarProduct.module.css';
import { useProductSelector } from '../../../hooks/storeHooks';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTES } from '../../../Constants/Routes';

// Lazy load components
const ProductList = React.lazy(() => import('../../ProductListComponents/ProductList/ProductList'));
const ProductNotFoundPage = React.lazy(() => import('../../../pages/ProductNotFound/ProductNotFoundPage'));

const SimilarProduct: React.FC = () => {
  const data = useProductSelector(state => state.product);
  const navigate = useNavigate();

  const product = data.selectedProduct?.product;
  const similarProducts = data.selectedProduct?.similarProducts ?? [];

  // Prepare "Show More About" buttons
  const showMoreButtons = [
    {
      label: product?.subCategory
        ? `Show More About ${product.subCategory}`
        : null,
      path: product?.subCategory ? `${PRODUCT_ROUTES.list}/${product.subCategory}` : null,
    },
    {
      label: product?.name
        ? `Show More About ${product.name}`
        : null,
      path: product?.name ? `${PRODUCT_ROUTES.list}/${product.name}` : null,
    },
    {
      label: product?.brand
        ? `Show More About ${product.brand}`
        : null,
      path: product?.brand ? `${PRODUCT_ROUTES.list}/${product.brand}` : null,
    },
  ].filter(btn => btn.label && btn.path);

  return (
    <div className={styles.container}>
      <h3 style={{fontFamily:'Times New Roman'}}>SIMILAR PRODUCTS</h3>
      
        { data.selectedProduct && similarProducts.length > 0 ? (
          <>
            <ProductList data={data.selectedProduct?.similarProducts} isSimilar={true}/>
            <div className={styles.allContainer}>
              {showMoreButtons.map(({ label, path }) => (
                <div className={styles.buttonContainer} key={label}>
                  <button onClick={() => navigate(path!)} type="button">
                    {label}
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <ProductNotFoundPage isSimilar={true} />
        )}
      
    </div>
  );
};

export default React.memo(SimilarProduct);
