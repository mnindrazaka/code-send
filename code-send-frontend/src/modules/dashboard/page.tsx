import React from "react";
import { Card, Row, Col, PageHeader, Skeleton, Result, Button } from "antd";
import {
  NumberOutlined,
  InfoCircleOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import { ReactComponent as Empty } from "assets/images/empty.svg";
import { useGetLatestUpdate } from "hooks/api/useUpdateApi";
import Container from "components/container";
import { getFormattedDate } from "utils/dateTime";
import { Link } from "react-router-dom";
import { useProjectState } from "hooks/store/useProjectStore";
import { useUpdateState } from "hooks/store/useUpdateStore";

const Page: React.FC = () => {
  const { selected } = useProjectState();
  const { latest, loading } = useUpdateState();
  useGetLatestUpdate();

  return (
    <>
      <PageHeader title={selected?.name} subTitle={selected?._id} />
      <Container>
        {latest || loading ? (
          <Row gutter={16}>
            <Col span="8">
              <Card>
                <Skeleton avatar loading={loading} active>
                  <Card.Meta
                    title="Version"
                    description={latest?.version}
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
                    description={latest?.note}
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
                    description={getFormattedDate(latest?.createdAt || "")}
                    avatar={<CalendarOutlined />}
                  />
                </Skeleton>
              </Card>
            </Col>
          </Row>
        ) : (
          <Card>
            <Result
              icon={<Empty style={{ width: 200, height: 200 }} />}
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
    </>
  );
};

export default Page;
