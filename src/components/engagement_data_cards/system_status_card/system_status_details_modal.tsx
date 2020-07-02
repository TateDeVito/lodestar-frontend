import React from 'react';
import {
  Modal,
  ModalVariant,
  Button,
  Grid,
  GridItem,
} from '@patternfly/react-core';

import { SystemMessage } from '../../../schemas/system_message';
import { EditModalTemplate } from '../../../layout/edit_modal_template';
import { useModalVisibility } from '../../../context/edit_modal_visibility_context/edit_modal_visibility_hook';
import { StatusMessageItem } from './status_message_item';
import { Engagement } from '../../../schemas/engagement_schema';
export interface SystemStatusDetailsModalProps {
  isOpen: boolean;
  engagement: Engagement;
}
export function SystemStatusDetailsModal(props: SystemStatusDetailsModalProps) {
  const { requestClose } = useModalVisibility();

  return (
    <Modal
      variant={ModalVariant.large}
      isOpen={props.isOpen}
      onClose={requestClose}
    >
      <EditModalTemplate
        actions={
          <div>
            <Button onClick={requestClose}>Close</Button>
          </div>
        }
        title="System Status Messages"
      >
        <DetailedSystemStatusList
          messages={props.engagement?.status?.messages}
        />
      </EditModalTemplate>
    </Modal>
  );
}

function DetailedSystemStatusList({ messages }: { messages: SystemMessage[] }) {
  return (
    <Grid>
      {messages?.map(systemMessage => (
        <GridItem span={12}>
          <StatusMessageItem
            severity={systemMessage.severity}
            message={systemMessage.message}
            updated={systemMessage.updated}
          />
        </GridItem>
      ))}
    </Grid>
  );
}