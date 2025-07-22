import React, { useState } from 'react';
import { MapPin, Plus, Minus, Truck } from 'lucide-react';
import styles from './ProductInfo.module.css';
import { PRODUCT_INFO, type PRODUCT_INFO_TYPE } from '../../../Product.enum';

interface IngredientItem {
  name: string;
  description: string;
}


const CONTENT_THRESHOLD = 180;

const ingredientsData: IngredientItem[] = [
  {
    name: "Avocado oil from brazil",
    description: "Avocado oil are kind of like cacao nuts, and give us their own moisturising, skin-loving oil to nourish bods."
  },
  {
    name: "Argan Oil",
    description: "This stuff is like liquid gold, rich in vitamin E and polyunsaturated fatty acids that are super nourishing for skin"
  },
  {
    name: "Argan Oil",
    description: "This stuff is like liquid gold, rich in vitamin E and polyunsaturated fatty acids that are super nourishing for skin"
  }
];

const whatItDoesContent = `Dreaming of a summer escape? Slip into the shower for a taste of the tropics with this fruity fresh shower gel. It's enriched with mango extract from soft and squidgy mangoes and cleanses your skin with its silky sudsy layers. The best part? You get to soak up the sweet luscious scent of summertime mangoes as you lather...`;

const additionalInfoContent = 'Apply to lips straight from the bullet or with a Lipstick & Concealer Brush. Four steps to the perfect pout:';

const ProductInfo: React.FC = () => {
  const [pinCode, setPinCode] = useState('');
  const [expanded, setExpanded] = useState<Record<PRODUCT_INFO_TYPE, boolean>>({
    [PRODUCT_INFO.WHAT_IT_DOES]: false,
    [PRODUCT_INFO.INGREDIENTS]: false,
     [PRODUCT_INFO.ADDITIONAL_INFO]: false,
  });

  // Show toggle if content is long
  const needsToggle = (key: PRODUCT_INFO_TYPE) => {
    if (key === PRODUCT_INFO.INGREDIENTS) return ingredientsData.length > 2;
    if (key === PRODUCT_INFO.WHAT_IT_DOES) return whatItDoesContent.length > CONTENT_THRESHOLD;
    if (key === PRODUCT_INFO.ADDITIONAL_INFO) return additionalInfoContent.length > CONTENT_THRESHOLD;
    return false;
  };

  // Get preview for collapsed text
  const getPreview = (text: string) =>
    text.length > CONTENT_THRESHOLD ? text.slice(0, CONTENT_THRESHOLD) + '...' : text;

  // Toggle handler
  const handleToggle = (key: PRODUCT_INFO_TYPE) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.container}>
      {/* Delivery Option */}
      <div className={styles.section}>
        <h3 style={{fontFamily:'Times New Roman'}}>Delivery Option</h3>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter Pin Code"
            value={pinCode}
            onChange={e => setPinCode(e.target.value)}
            className={styles.input}
          />
          <MapPin className={styles.icon} />
        </div>
        {pinCode ? (<>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <Truck color='#3D857E'/>
        <p className={styles.text}>
         Express Delivery-Get it by June 3 for 100
        </p>
        </div>
       <div style={{display:'flex',alignItems:'center',gap:'10px',marginTop:'-15px'}}>
       <Truck color='#3D857E'/>
       <p className={styles.text}>
          Standard Delivery-Get it by June 10 for 30
        </p>
       </div>
        </>):<p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>}
      </div>

      {/* What does it do for you */}
      <div className={styles.section}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <h3 className={styles.sectionTitle} style={{ flex: 1 }}>What does it do for you</h3>
          {needsToggle(PRODUCT_INFO.WHAT_IT_DOES) && (
            <button
              className={styles.sectionHeader}
              onClick={() => handleToggle(PRODUCT_INFO.WHAT_IT_DOES)}
              aria-label={expanded.whatItDoes ? 'Collapse section' : 'Expand section'}
              style={{ width: 'auto', padding: 0, background: 'none', border: 'none' }}
            >
              {expanded.whatItDoes ? (
                <Minus className={styles.toggleIcon} />
              ) : (
                <Plus className={styles.toggleIcon} />
              )}
            </button>
          )}
        </div>
        <div
          className={styles.toggleContent}
          style={{
            maxHeight: expanded.whatItDoes || !needsToggle(PRODUCT_INFO.WHAT_IT_DOES) ? 800 : 80,
            opacity: expanded.whatItDoes || !needsToggle(PRODUCT_INFO.WHAT_IT_DOES) ? 1 : 0.85,
          }}
        >
          <div className={styles.toggleContentInner}>
            <p className={styles.text}>
              {expanded.whatItDoes || !needsToggle(PRODUCT_INFO.WHAT_IT_DOES)
                ? whatItDoesContent
                : getPreview(whatItDoesContent)}
              
            
            </p>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className={styles.section}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <h3 className={styles.sectionTitle} style={{ flex: 1 }}>Ingredients</h3>
          {needsToggle(PRODUCT_INFO.INGREDIENTS) && (
            <button
              className={styles.sectionHeader}
              onClick={() => handleToggle(PRODUCT_INFO.INGREDIENTS)}
              aria-label={expanded.ingredients ? 'Collapse section' : 'Expand section'}
              style={{ width: 'auto', padding: 0, background: 'none', border: 'none' }}
            >
              {expanded.ingredients ? (
                <Minus className={styles.toggleIcon} />
              ) : (
                <Plus className={styles.toggleIcon} />
              )}
            </button>
          )}
        </div>
        <div
          className={styles.toggleContent}
          style={{
            maxHeight: expanded.ingredients || !needsToggle(PRODUCT_INFO.INGREDIENTS) ? 800 : 100,
            opacity: expanded.ingredients || !needsToggle(PRODUCT_INFO.INGREDIENTS) ? 1 : 0.85,
          }}
        >
          <div className={styles.toggleContentInner}>
            {(expanded.ingredients || !needsToggle(PRODUCT_INFO.INGREDIENTS)
              ? ingredientsData
              : ingredientsData.slice(0, 2)
            ).map((ingredient, idx) => (
              <div key={idx} className={styles.ingredientItem}>
                <h4 className={styles.ingredientTitle}>{ingredient.name}</h4>
                <p className={styles.text}>{ingredient.description}</p>
              </div>
            ))}
           
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className={styles.section}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <h3 className={styles.sectionTitle} style={{ flex: 1 }}>Additional Information</h3>
          {needsToggle(PRODUCT_INFO.ADDITIONAL_INFO) && (
            <button
              className={styles.sectionHeader}
              onClick={() => handleToggle(PRODUCT_INFO.ADDITIONAL_INFO)}
              aria-label={expanded.additionalInfo ? 'Collapse section' : 'Expand section'}
              style={{ width: 'auto', padding: 0, background: 'none', border: 'none' }}
            >
              {expanded.additionalInfo ? (
                <Minus className={styles.toggleIcon} />
              ) : (
                <Plus className={styles.toggleIcon} />
              )}
            </button>
          )}
        </div>
        <div
          className={styles.toggleContent}
          style={{
            maxHeight: expanded.additionalInfo || !needsToggle(PRODUCT_INFO.ADDITIONAL_INFO) ? 800 : 80,
            opacity: expanded.additionalInfo || !needsToggle(PRODUCT_INFO.ADDITIONAL_INFO) ? 1 : 0.85,
          }}
        >
          <div className={styles.toggleContentInner}>
            <p className={styles.text}>
              {expanded.additionalInfo || !needsToggle(PRODUCT_INFO.ADDITIONAL_INFO)
                ? additionalInfoContent
                : getPreview(additionalInfoContent)}
             
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
