import PropTypes from 'prop-types';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory('')}
        className={selectedCategory === '' ? 'category-chip-active' : 'category-chip'}
      >
        Semua
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={selectedCategory === category ? 'category-chip-active' : 'category-chip'}
        >
          #{category}
        </button>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
