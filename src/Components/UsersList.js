import { useState } from "react";
import User from "./User"

export default function UsersList({ users }) {
    const [searchInput, setSearchInput] = useState("");
    const [sortKey, setSortKey] = useState("id");
    const [expanded, setExpanded] = useState([]);

    const toggleExpanded = (id) => {
        if (expanded.includes(id)) {
            setExpanded(expanded.filter((currId) => currId !== id));
        } else {
            setExpanded([...expanded, id]);
        }
    }
    const toggleExpandAll = () => {
        const expandAll = users.map((user) => user.id);
        setExpanded(expandAll);
    };
    const toggleCollapseAll = () => {
        setExpanded([]);
    };

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSortKeyChange = (e) => {
        setSortKey(e.target.value);
    };

    const usersToDisplay = users.filter((user) => {
        const { first_name, last_name, email } = user;
        const fullName = `${first_name} ${last_name}`;
        return fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
            email.toLowerCase().includes(searchInput.toLowerCase());
    });

    usersToDisplay.sort((a, b) => {
        let aValue = a[sortKey];
        let bValue = b[sortKey];
        if (sortKey === "name") {
            aValue = `${a.first_name} ${a.last_name}`;
            bValue = `${b.first_name} ${b.last_name}`;
        }
        if (aValue < bValue) {
            return -1;
        } else if (aValue > bValue) {
            return 1;
        } else {
            return 0;
        }
    });

    const renderContent = () => {
        if (!usersToDisplay.length) {
            return <div className="NoContent">No results for {searchInput} </div>;
        }
        return usersToDisplay.map((user) => (
            <User key={user.id} user={user} expanded={expanded.includes(user.id)}
                onClick={() => toggleExpanded(user.id)} />
        ));
    };

    return (
        <div>
            <section>
                <div className="">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleChange}
                        placeholder="Search by full name or email"
                    />
                    <label>Sort by: </label>
                    <select value={sortKey} onChange={handleSortKeyChange}>
                        <option value="id">default</option>
                        <option value="name">name</option>
                        <option value="email">email</option>
                    </select>
                    <button onClick={toggleExpandAll}>Expand All</button>
                    <button onClick={toggleCollapseAll}>Collaspe All</button>

                </div>
                <div className=''>{renderContent()}</div>
            </section>
        </div>
    );
}
