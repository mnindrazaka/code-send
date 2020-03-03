import React from "react";
import { Card, Row, Col, PageHeader, Skeleton } from "antd";
import {
  NumberOutlined,
  InfoCircleOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import { useGetLatestUpdate } from "hooks/useUpdate";

const Page: React.FC = () => {
  const { latestUpdate, loading } = useGetLatestUpdate();

  return (
    <div data-testid="page-dashboard">
      <PageHeader
        title="Latest Update"
        subTitle="Show your latest update information"
      />

      <Row style={{ marginTop: 15 }} gutter={16}>
        <Col span="8">
          <Card>
            <Skeleton avatar loading={loading} active>
              <Card.Meta
                title="Version"
                description={latestUpdate?.version}
                avatar={<NumberOutlined />}
              />
            </Skeleton>
          </Card>
        </Col>

        <Col span="8">
          <Card>
            <Skeleton avatar loading={loading} active>
              <Card.Meta
                title="Note"
                description={latestUpdate?.note}
                avatar={<InfoCircleOutlined />}
              />
            </Skeleton>
          </Card>
        </Col>

        <Col span="8">
          <Card>
            <Skeleton avatar loading={loading} active>
              <Card.Meta
                title="Release Date"
                description={latestUpdate?.createdAt}
                avatar={<CalendarOutlined />}
              />
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Page;
