import { useState, useEffect } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import * as d3 from "d3-format";

import * as API from "../api";

const SearchFieldContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
`;

const SearchField = styled.input`
  // border-radius: 3px;
  outline: none;
  border: 2px solid #000;
  box-shadow: 4px 4px 0 #222;
  width: 100%;
  height: 40px;
  padding-left: 5px;

  &:focus {
    box-shadow: 0 0 1px 5px #fff25c;
  }
`;

const StyledList = styled.ul`
  margin: 0;
  margin-top: 10px;
  padding: 0;
  list-style: none;

  li {
    cursor: pointer;
    padding: 2vw;
    margin-bottom: 10px;
    background-color: #fff;
    border: 1px solid black;
    color: #000;
    box-shadow: 4px 4px 0 #222;

    &:hover {
      position: relative;
      top: 2px;
      left: 2px;
      box-shadow: 2px 2px 0 #222;
    }
  }

  .name {
    margin-right: 20px;
  }
`;

const textChanged = (value, callback) => {
  callback(value);
};
const textChangedDebounced = debounce(textChanged, 500);

const List = (props) => {
  const {
    repository: [_, setSelectedRepository],
  } = {
    repository: useState({}),
    ...props.state,
  };
  const { repositories } = props;

  function onSelectRepository(repository) {
    setSelectedRepository(repository);
  }

  return (
    <StyledList>
      {repositories.map((repo, i) => (
        <li
          key={`${repo.id}${i}`}
          onClick={onSelectRepository.bind(null, repo)}
        >
          <span className="name">{repo.full_name}</span>
          <span className="stars">
            <FontAwesomeIcon icon={faStar} width="16" />
            {d3.format(".2s")(repo.stargazers_count)}
          </span>
        </li>
      ))}
    </StyledList>
  );
};

export default (props) => {
  const {
    repository: [selectedRepository, setSelectedRepository],
    search: [searchQuery, setSearchQuery],
  } = {
    search: useState(""),
    repository: useState({}),
    ...props.state,
  };
  const [repositories, setRepositories] = useState([]);

  const inputChanged = (e) => {
    const value = e.target.value;
    textChangedDebounced(value, (val) => {
      setSearchQuery(val);
    });
  };

  useEffect(() => {
    (async () => {
      const repos = await API.search(searchQuery);
      setRepositories(repos);
    })();
  }, [searchQuery]);

  return (
    <>
      <SearchFieldContainer>
        <SearchField
          type="text"
          placeholder="Search..."
          name="search_repo"
          autocomplete="off"
          onChange={inputChanged}
        />
        <SearchIcon icon={faSearch} width="16" />
      </SearchFieldContainer>
      {searchQuery.length > 0 && repositories.length > 0 ? (
        <List
          state={{ repository: [selectedRepository, setSelectedRepository] }}
          repositories={repositories}
        />
      ) : undefined}
    </>
  );
};
