# -*- coding: utf-8 -*-

# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/type/datetime.proto

from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database

# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.protobuf import duration_pb2 as google_dot_protobuf_dot_duration__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
    name="google/type/datetime.proto",
    package="google.type",
    syntax="proto3",
    serialized_options=b"\n\017com.google.typeB\rDateTimeProtoP\001Z<google.golang.org/genproto/googleapis/type/datetime;datetime\370\001\001\242\002\003GTP",
    serialized_pb=b'\n\x1agoogle/type/datetime.proto\x12\x0bgoogle.type\x1a\x1egoogle/protobuf/duration.proto"\xe0\x01\n\x08\x44\x61teTime\x12\x0c\n\x04year\x18\x01 \x01(\x05\x12\r\n\x05month\x18\x02 \x01(\x05\x12\x0b\n\x03\x64\x61y\x18\x03 \x01(\x05\x12\r\n\x05hours\x18\x04 \x01(\x05\x12\x0f\n\x07minutes\x18\x05 \x01(\x05\x12\x0f\n\x07seconds\x18\x06 \x01(\x05\x12\r\n\x05nanos\x18\x07 \x01(\x05\x12/\n\nutc_offset\x18\x08 \x01(\x0b\x32\x19.google.protobuf.DurationH\x00\x12*\n\ttime_zone\x18\t \x01(\x0b\x32\x15.google.type.TimeZoneH\x00\x42\r\n\x0btime_offset"\'\n\x08TimeZone\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0f\n\x07version\x18\x02 \x01(\tBi\n\x0f\x63om.google.typeB\rDateTimeProtoP\x01Z<google.golang.org/genproto/googleapis/type/datetime;datetime\xf8\x01\x01\xa2\x02\x03GTPb\x06proto3',
    dependencies=[google_dot_protobuf_dot_duration__pb2.DESCRIPTOR],
)


_DATETIME = _descriptor.Descriptor(
    name="DateTime",
    full_name="google.type.DateTime",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    fields=[
        _descriptor.FieldDescriptor(
            name="year",
            full_name="google.type.DateTime.year",
            index=0,
            number=1,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="month",
            full_name="google.type.DateTime.month",
            index=1,
            number=2,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="day",
            full_name="google.type.DateTime.day",
            index=2,
            number=3,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="hours",
            full_name="google.type.DateTime.hours",
            index=3,
            number=4,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="minutes",
            full_name="google.type.DateTime.minutes",
            index=4,
            number=5,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="seconds",
            full_name="google.type.DateTime.seconds",
            index=5,
            number=6,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="nanos",
            full_name="google.type.DateTime.nanos",
            index=6,
            number=7,
            type=5,
            cpp_type=1,
            label=1,
            has_default_value=False,
            default_value=0,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="utc_offset",
            full_name="google.type.DateTime.utc_offset",
            index=7,
            number=8,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="time_zone",
            full_name="google.type.DateTime.time_zone",
            index=8,
            number=9,
            type=11,
            cpp_type=10,
            label=1,
            has_default_value=False,
            default_value=None,
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[
        _descriptor.OneofDescriptor(
            name="time_offset",
            full_name="google.type.DateTime.time_offset",
            index=0,
            containing_type=None,
            fields=[],
        )
    ],
    serialized_start=76,
    serialized_end=300,
)


_TIMEZONE = _descriptor.Descriptor(
    name="TimeZone",
    full_name="google.type.TimeZone",
    filename=None,
    file=DESCRIPTOR,
    containing_type=None,
    fields=[
        _descriptor.FieldDescriptor(
            name="id",
            full_name="google.type.TimeZone.id",
            index=0,
            number=1,
            type=9,
            cpp_type=9,
            label=1,
            has_default_value=False,
            default_value=b"".decode("utf-8"),
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
        _descriptor.FieldDescriptor(
            name="version",
            full_name="google.type.TimeZone.version",
            index=1,
            number=2,
            type=9,
            cpp_type=9,
            label=1,
            has_default_value=False,
            default_value=b"".decode("utf-8"),
            message_type=None,
            enum_type=None,
            containing_type=None,
            is_extension=False,
            extension_scope=None,
            serialized_options=None,
            file=DESCRIPTOR,
        ),
    ],
    extensions=[],
    nested_types=[],
    enum_types=[],
    serialized_options=None,
    is_extendable=False,
    syntax="proto3",
    extension_ranges=[],
    oneofs=[],
    serialized_start=302,
    serialized_end=341,
)

_DATETIME.fields_by_name[
    "utc_offset"
].message_type = google_dot_protobuf_dot_duration__pb2._DURATION
_DATETIME.fields_by_name["time_zone"].message_type = _TIMEZONE
_DATETIME.oneofs_by_name["time_offset"].fields.append(
    _DATETIME.fields_by_name["utc_offset"]
)
_DATETIME.fields_by_name["utc_offset"].containing_oneof = _DATETIME.oneofs_by_name[
    "time_offset"
]
_DATETIME.oneofs_by_name["time_offset"].fields.append(
    _DATETIME.fields_by_name["time_zone"]
)
_DATETIME.fields_by_name["time_zone"].containing_oneof = _DATETIME.oneofs_by_name[
    "time_offset"
]
DESCRIPTOR.message_types_by_name["DateTime"] = _DATETIME
DESCRIPTOR.message_types_by_name["TimeZone"] = _TIMEZONE
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

DateTime = _reflection.GeneratedProtocolMessageType(
    "DateTime",
    (_message.Message,),
    {
        "DESCRIPTOR": _DATETIME,
        "__module__": "google.type.datetime_pb2"
        # @@protoc_insertion_point(class_scope:google.type.DateTime)
    },
)
_sym_db.RegisterMessage(DateTime)

TimeZone = _reflection.GeneratedProtocolMessageType(
    "TimeZone",
    (_message.Message,),
    {
        "DESCRIPTOR": _TIMEZONE,
        "__module__": "google.type.datetime_pb2"
        # @@protoc_insertion_point(class_scope:google.type.TimeZone)
    },
)
_sym_db.RegisterMessage(TimeZone)


DESCRIPTOR._options = None
# @@protoc_insertion_point(module_scope)
