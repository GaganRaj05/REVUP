import SearchIcon from "../assets/search.svg"
function SearchBar() {
    return (
        <div className="search-bar">
            <form className="search-form" action="">
                <img className="search-icon" src={SearchIcon} alt="" />
                <input type="text" placeholder="Search for users" />
                <button type="submit">submit</button>
            </form>
        </div>
    )
}
export default SearchBar;