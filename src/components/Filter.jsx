import { Form, FormGroup, FormLabel } from 'react-bootstrap';

const Filter = ({ setSortBy }) => {
  //   function handleSubmit(event) {
  //     event.preventDefault();
  //   }

  return (
    <Form className="filter-form">
      <FormGroup className="mb-3" size="sm">
        <FormLabel>Sort By</FormLabel>
        <Form.Select
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value=""></option>
          <option value="asc">Date ascending</option>
          <option value="desc">Date descending</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Votes</option>
        </Form.Select>
      </FormGroup>
    </Form>
  );
};

export default Filter;
