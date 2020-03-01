import React from "react";
import { Card, Dimmer, Loader } from "semantic-ui-react";
import { useGetLatestUpdate } from "hooks/stores/update";
import swal from "sweetalert";

const Page: React.FC = () => {
  const { latestUpdate, loading, error } = useGetLatestUpdate();

  const renderData = () => {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Latest Update</Card.Header>
          <Card.Meta>{latestUpdate?.version}</Card.Meta>
          <Card.Description>{latestUpdate?.note}</Card.Description>
        </Card.Content>
      </Card>
    );
  };

  const renderLoading = () => {
    return (
      <Dimmer active inverted>
        <Loader inverted size="medium">
          Getting Update
        </Loader>
      </Dimmer>
    );
  };

  if (error) {
    swal({
      title: "Failed",
      icon: "error",
      text: error
    });
  }

  return (
    <div data-testid="page-dashboard">
      {loading ? renderLoading() : renderData()}
    </div>
  );
};

export default Page;
