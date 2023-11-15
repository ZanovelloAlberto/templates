/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "ok";

export interface Info {
}

export interface Person {
  name: string;
  /** repeated string email = 3; */
  age: number;
}

export interface AddressBook {
  people: Person[];
}

function createBaseInfo(): Info {
  return {};
}

export const Info = {
  encode(_: Info, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Info {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Info {
    return {};
  },

  toJSON(_: Info): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Info>, I>>(base?: I): Info {
    return Info.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Info>, I>>(_: I): Info {
    const message = createBaseInfo();
    return message;
  },
};

function createBasePerson(): Person {
  return { name: "", age: 0 };
}

export const Person = {
  encode(message: Person, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== 0) {
      writer.uint32(16).int32(message.age);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Person {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePerson();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.age = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Person {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      age: isSet(object.age) ? globalThis.Number(object.age) : 0,
    };
  },

  toJSON(message: Person): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.age !== 0) {
      obj.age = Math.round(message.age);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Person>, I>>(base?: I): Person {
    return Person.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Person>, I>>(object: I): Person {
    const message = createBasePerson();
    message.name = object.name ?? "";
    message.age = object.age ?? 0;
    return message;
  },
};

function createBaseAddressBook(): AddressBook {
  return { people: [] };
}

export const AddressBook = {
  encode(message: AddressBook, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.people) {
      Person.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddressBook {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressBook();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.people.push(Person.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddressBook {
    return {
      people: globalThis.Array.isArray(object?.people) ? object.people.map((e: any) => Person.fromJSON(e)) : [],
    };
  },

  toJSON(message: AddressBook): unknown {
    const obj: any = {};
    if (message.people?.length) {
      obj.people = message.people.map((e) => Person.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AddressBook>, I>>(base?: I): AddressBook {
    return AddressBook.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AddressBook>, I>>(object: I): AddressBook {
    const message = createBaseAddressBook();
    message.people = object.people?.map((e) => Person.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
