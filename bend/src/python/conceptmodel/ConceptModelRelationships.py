from models.TracePayload import TraceRelationships


def add_concept_families(dataset: str, relationships: TraceRelationships):
    families = relationships.relationships
    source_weight = relationships.source_descriptors
    target_weights = relationships.target_descriptors
    # concept_model = get_concept_model_for_dataset(dataset)
    return relationships
