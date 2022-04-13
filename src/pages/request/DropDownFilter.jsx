import { Collapse, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Add/Button";
import Heading from "../../components/Heading/Heading";
import { getAllAuthor } from "../../store/actions/users";
import { initFilter } from "./init";
import SelectPriority from "./SelectPriority";
import SelectStatus from "./SelectStatus";
import { useCondition } from './../../hooks/useCondition';
const { Option } = Select;
const { Panel } = Collapse;

const DropdownFilter = ({
  users,
  categories,
  departments,
  onFilter,
  onClickFilter,
  filters,
}) => {
  const [filter, setFilter] = useState({ ...filters });
  const dispatch = useDispatch();
  const {onSuccess, onError} = useCondition();
  const handleClear = () => {
    setFilter({ ...initFilter });
  };
  const handleFilter = () => {
    onFilter(filter);
  };
  const authors = useSelector(state=>state.users.authors);

  const handleFilterName = (value) => setFilter({ ...filter, name: value });
  const handleFilterContent = (value) =>
    setFilter({ ...filter, content: value });
  const handleFilterDate = (value) => setFilter({ ...filter, date: value });
  const handleFilterStatus = (value) =>
    setFilter({ ...filter, status: [...value] });
  const handleFilterPriority = (value) =>
    setFilter({ ...filter, priority: [...value] });
  const handleFilterAuthor = (value) =>
    setFilter({ ...filter, user_id: value });
  const handleFilterAssignee = (value) =>
    setFilter({ ...filter, operator_id: value });
  const handleFilterCategory = (value) =>
    setFilter({ ...filter, category_id: value });
  const handleFilterDepartment = (value) =>
    setFilter({ ...filter, department_id: value });

  useEffect(()=>{
    if(authors.length===0){
      dispatch(getAllAuthor(onSuccess, onError));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Collapse
      className="site-collapse-custom-collapse"
      onChange={onClickFilter}
      expandIconPosition="right"
    >
      <Panel
        header={<Heading>Filter</Heading>}
        key="1"
        className="site-collapse-custom-panel"
      >
        <div className="filter-request" style={{ paddingTop: "40px" }}>
          <div className="row-filter">
            <label>Name Request</label>
            <Input
              className="filter-field"
              placeholder="Name"
              value={filter.name}
              onChange={(e) => handleFilterName(e.target.value)}
            />
          </div>
          <div className="row-filter">
            <label>Content</label>
            <Input
              className="filter-field"
              placeholder="Content"
              value={filter.content}
              onChange={(e) => handleFilterContent(e.target.value)}
            />
          </div>
          <div className="row-filter">
            <label>Date create</label>
            <Input
              className="filter-field"
              placeholder="Name"
              type={"date"}
              value={filter.date}
              onChange={(e) => handleFilterDate(e.target.value)}
            />
          </div>
          <div className="row-filter">
            <label>Status</label>
            <SelectStatus
              className="filter-field"
              value={filter.status}
              multiple={true}
              onSelect={handleFilterStatus}
            />
          </div>
          <div className="row-filter">
            <label>Author</label>
            <Select
              value={filter.user_id}
              className="filter-field"
              allowClear
              onSelect={handleFilterAuthor}
              placeholder="Author"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              showSearch={true}
            >
              {authors.map((user) => {
                return (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="row-filter">
            <label>Assignee</label>

            <Select
              className="filter-field"
              allowClear
              value={filter.operator_id}
              placeholder="Assignee"
              onSelect={handleFilterAssignee}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              showSearch={true}
            >
              {users.map((user) => {
                return (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="row-filter">
            <label>Category</label>
            <Select
              className="filter-field"
              value={filter.category_id}
              allowClear
              onSelect={handleFilterCategory}
              placeholder="Category"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              showSearch={true}
            >
              {categories.map((category) => {
                return (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="row-filter">
            <label>Department</label>
            <Select
              className="filter-field"
              value={filter.department_id}
              onSelect={handleFilterDepartment}
              placeholder="Department"
              allowClear
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              showSearch={true}
            >
              {departments.map((department) => {
                return (
                  <Option key={department.id} value={department.id}>
                    {department.name}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="row-filter">
            <label>Priority</label>
            <SelectPriority
              className="filter-field"
              onSelect={handleFilterPriority}
              value={filter.priority}
              multiple={true}
            />
          </div>
        </div>
        <div className="footer-filter">
          <div className="btn-group" key={1}>
            <Button className="btn-cancel" key="clear" onClick={handleClear}>
              Clear
            </Button>
            <Button className="btn-filter" key="filter" onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
};

DropdownFilter.defaultProps = {
  users: [],
  categories: [],
  departments: [],
};

export default DropdownFilter;
