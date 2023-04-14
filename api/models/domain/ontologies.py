from typing import Optional

from beanie import Document, Indexed, PydanticObjectId

from core.config import get_settings

from models.schemas import OntologyData


class OntologyDocument(Document):
    name: Indexed(str)
    file_id: Optional[PydanticObjectId]
    data: OntologyData

    class Settings:
        name = get_settings().ontos_collection