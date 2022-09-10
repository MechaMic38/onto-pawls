import React, { useState, useContext } from 'react';
import { Modal, Transfer } from '@allenai/varnish';
import { Annotation, RelationGroup, AnnotationStore } from '../context';
import { OntoProperty } from '../api';
import { AnnotationSummary } from './AnnotationSummary';
import DropdownOntoProperties from './sidebar/DropdownOntoProperties';

interface RelationModalProps {
    visible: boolean;
    onClick: (group: RelationGroup) => void;
    onCancel: () => void;
    source: Annotation[];
    label: OntoProperty;
}

export const RelationModal = ({
    visible,
    onClick,
    onCancel,
    source,
    label,
}: RelationModalProps) => {
    const annotationStore = useContext(AnnotationStore);
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const transferSource = source.map((a) => ({ key: a.id, annotation: a }));

    return (
        <Modal
            title="Annotate Relations"
            width={800}
            visible={visible}
            maskClosable={true}
            onCancel={() => {
                setTargetKeys([]);
                onCancel();
            }}
            onOk={() => {
                const sourceIds = source
                    .filter((s) => !targetKeys.some((k) => k === s.id))
                    .map((s) => s.id);
                onClick(new RelationGroup(sourceIds, targetKeys, label));
                setTargetKeys([]);
            }}>
            <h5>Choose a Relation</h5>
            <DropdownOntoProperties annotationStore={annotationStore}></DropdownOntoProperties>
            <br />
            <Transfer
                dataSource={transferSource}
                listStyle={{ width: 300, marginTop: '20px' }}
                showSearch={false}
                targetKeys={targetKeys}
                onChange={setTargetKeys}
                render={(item) => <AnnotationSummary annotation={item.annotation} />}
            />
        </Modal>
    );
};
