import CategoryItem from "../category-item/category-item.component";

import "./categories-list.styles.scss";

const CategoriesList = (props) => {
    return (
        <div className="categories-container">
            {props.categories.map((category) => {
                return <CategoryItem key={category.id} category={category} />;
            })}
        </div>
    );
};

export default CategoriesList;
