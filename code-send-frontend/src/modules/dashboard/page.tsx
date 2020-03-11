import React from "react";
import { Card, Row, Col, PageHeader, Skeleton, Result, Button } from "antd";
import {
  NumberOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  FrownOutlined
} from "@ant-design/icons";
import { useGetLatestUpdate } from "hooks/useUpdate";
import Container from "components/container";
import { getFormattedDate } from "utils/dateTime";
import { Link } from "react-router-dom";

const Page: React.FC = () => {
  const { latest, loading } = useGetLatestUpdate();

  return (
    <div data-testid="page-dashboard">
      <PageHeader
        title="Latest Update"
        subTitle="Show your latest update information"
        backIcon
      />

      <Container>
        {latest ? (
          <Row gutter={16}>
            <Col span="8">
              <Card>
                <Skeleton avatar loading={loading} active>
                  <Card.Meta
                    title="Version"
                    description={latest.version}
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
                    description={latest.note}
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
                    description={getFormattedDate(latest.createdAt)}
                    avatar={<CalendarOutlined />}
                  />
                </Skeleton>
              </Card>
            </Col>
          </Row>
        ) : (
          <Card>
            <Result
              icon={<FrownOutlined />}
              title="You Have No Update !"
              subTitle="Create one and start developing your application"
              extra={
                <Link to="/update/create">
                  <Button type="primary">Create Update Now</Button>
                </Link>
              }
            />
          </Card>
        )}
      </Container>
    </div>
  );
};

export default Page;
