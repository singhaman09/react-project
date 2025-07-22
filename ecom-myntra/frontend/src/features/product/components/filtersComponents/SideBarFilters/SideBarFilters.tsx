import React from "react";
import styles from "../SideBarMain/SideBar.module.css";
import { getColorCodeFromString } from "../../../utils/colorsMapping";
import type { SideFilterProps } from "../../../interfaces/FilterInterfaces";
import { TAB_KEYS } from "../../../Product.enum";

const SideBarFilters: React.FC<SideFilterProps> = ({
  data,
  type,
  selectedData,
  handleChange
}) => (
  <div>
    <div>
      {data.map(item => (
        <label key={item} className={styles.checkboxRow}>
          {type === TAB_KEYS.COLOR ? (
            <span className={styles.colorSwatchWrapper}>
              <span
                className={styles.colorSwatch}
                style={{ backgroundColor:`${getColorCodeFromString(item)}` }}
                title={item}
              />
              <span className={styles.colorName}>{item}</span>
            </span>
          ) : (
            <h3>{item}</h3>
          )}
          <input
            type="checkbox"
            checked={selectedData && selectedData.includes(item)}
            onChange={e => handleChange(item, e.target.checked)}
          />
        </label>
      ))}
    </div>
  </div>
);

export default SideBarFilters;
