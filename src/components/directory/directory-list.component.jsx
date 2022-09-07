import DirectoryItem from "../directory-item/directory-item.component";

import "./directory-list.styles.scss";

const CategoriesList = (props) => {
    return (
        <div className="directory-container">
            {props.categories.map((category) => {
                return <DirectoryItem key={category.id} category={category} />;
            })}
        </div>
    );
};

export default CategoriesList;
