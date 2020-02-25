import React, { useState, useEffect } from "react";
import { Card, Dimmer, Loader } from "semantic-ui-react";
import { Update } from "interfaces/Update";
import codeSendService from "utils/api/codeSendService";
import swal from "sweetalert";

const Page: React.FC = () => {
  const [update, setUpdate] = useState<Update>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    codeSendService
      .getLatestUpdate()
      .then(update => setUpdate(update))
      .catch(error =>
        swal({
          title: "Failed",
          text: error.message,
          icon: "error"
        })
      )
      .finally(() => setLoading(false));
  }, []);

  const renderData = () => {
    return (
      <Card>
        <Card.Content>
          <Card.Header>Latest Update</Card.Header>
          <Card.Meta>{update?.version}</Card.Meta>
          <Card.Description>{update?.note}</Card.Description>
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

  return (
    <div data-testid="page-dashboard">
      {loading ? renderLoading() : renderData()}
    </div>
  );
};

export default Page;
