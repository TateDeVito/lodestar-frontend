import React from 'react';
import { Engagement, EngagementStatus } from '../../schemas/engagement';
import { differenceInWeeks, isValid } from 'date-fns';
import {
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Tooltip,
  TooltipPosition,
} from '@patternfly/react-core';
import {
  ClipboardCheckIcon,
  CodeBranchIcon,
  CubeIcon,
  OutlinedClockIcon,
  UserIcon,
} from '@patternfly/react-icons';
import { ActivityHistoryLineItem } from '../activity_history_line_item/activity_history_line_item';
import { Feature } from '../feature/feature';
import { EngagementStatusText } from '../engagement_status_text/engagement_status_text';
import { DisplayCreatedByName } from '../../common/display_created_by_name';
import { formatUtcDate } from '../../common/dates';

function DurationInWeeks({
  startDate,
  endDate,
}: {
  startDate?: Date;
  endDate?: Date;
}) {
  if (!!startDate && isValid(startDate) && !!endDate && isValid(endDate)) {
    return <>{differenceInWeeks(endDate, startDate)}</>;
  } else return <>0</>;
}

export function EngagementAtAGlance({
  engagement,
  status,
}: {
  engagement?: Engagement;
  status?: EngagementStatus;
}) {
  const styles = {
    lsGutterGapHack: {
      gridGap: '4px',
    },
  };

  return (
    <>
      <Grid hasGutter>
        <GridItem md={6} lg={12}>
          <Grid hasGutter style={styles.lsGutterGapHack}>
            <GridItem span={12}>
              {'Created by: '}
              <DisplayCreatedByName
                userFromServer={engagement?.creation_details?.created_by_user}
                lastUpdatedBy={engagement?.last_update_by_name}
              />
            </GridItem>
            <GridItem>
              {engagement?.engagement_type
                ? 'Engagement Type: ' +
                  engagement?.engagement_type
                : null}
            </GridItem>
            <GridItem>
              Target start date:{' '}
              {!!engagement?.start_date && isValid(engagement?.start_date)
                ? formatUtcDate(engagement?.start_date)
                : 'TBA'}
            </GridItem>
            <GridItem>
              {engagement?.engagement_region
                ? 'Engagement Region: ' +
                  engagement?.engagement_region?.toUpperCase?.()
                : null}
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem md={12} lg={6}>
          <Flex>
            <Flex>
              <FlexItem spacer={{ default: 'spacerSm' }}>
                <Tooltip
                  position={TooltipPosition.bottom}
                  entryDelay={0}
                  content={'Number of people in this engagement'}
                >
                  <UserIcon />
                </Tooltip>
              </FlexItem>
              <FlexItem>{engagement?.engagement_users?.length || 0}</FlexItem>
            </Flex>

            <Flex>
              <FlexItem spacer={{ default: 'spacerSm' }}>
                <Tooltip
                  position={TooltipPosition.bottom}
                  entryDelay={0}
                  content={'Number of weeks for this engagement'}
                >
                  <OutlinedClockIcon />
                </Tooltip>
              </FlexItem>
              <FlexItem>
                <DurationInWeeks
                  startDate={engagement?.start_date}
                  endDate={engagement?.end_date}
                />
              </FlexItem>
            </Flex>
            <Flex>
              <FlexItem spacer={{ default: 'spacerSm' }}>
                <Tooltip
                  position={TooltipPosition.bottom}
                  entryDelay={0}
                  content={'Number of available artifacts'}
                >
                  <ClipboardCheckIcon />
                </Tooltip>
              </FlexItem>
              <FlexItem>{engagement?.artifacts?.length || 0}</FlexItem>
            </Flex>
            <Feature name={'engagementCardIcons'}>
              <>
                <Flex>
                  <FlexItem spacer={{ default: 'spacerSm' }}>
                    <Tooltip
                      position={TooltipPosition.bottom}
                      entryDelay={0}
                      content={'Number of commits'}
                    >
                      <CodeBranchIcon />
                    </Tooltip>
                  </FlexItem>
                  <FlexItem>-</FlexItem>
                </Flex>

                <Flex>
                  <FlexItem spacer={{ default: 'spacerSm' }}>
                    <Tooltip
                      position={TooltipPosition.bottom}
                      entryDelay={0}
                      content={'Number of repositories'}
                    >
                      <CubeIcon />
                    </Tooltip>
                  </FlexItem>
                  <FlexItem>-</FlexItem>
                </Flex>
              </>
            </Feature>
            <Flex>
              <FlexItem>
                <EngagementStatusText status={status} />
              </FlexItem>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem md={12} lg={6}>
          <ActivityHistoryLineItem commit={engagement?.commits?.[0]} />
        </GridItem>
      </Grid>
    </>
  );
}
