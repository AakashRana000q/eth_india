# Copyright 2022 Cartesi Pte. Ltd.
#
# SPDX-License-Identifier: Apache-2.0
# Licensed under the Apache License, Version 2.0 (the "License"); you may not use
# this file except in compliance with the License. You may obtain a copy of the
# License at http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software distributed
# under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
# CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.

from os import environ
import logging
import requests
import json


file_functions=['get_basic_record/','newpatient/','update/','addrecord/','emergency/','get_file/','get_all_file/','get_patient_records/']
request_url='http://127.0.0.1:8000/'
logging.basicConfig(level="INFO")
logger = logging.getLogger(__name__)

rollup_server = environ["ROLLUP_HTTP_SERVER_URL"]
logger.info(f"HTTP rollup_server url is {rollup_server}")

def hex2str(hex):
    """
    Decodes a hex string into a regular string
    """
    return bytes.fromhex(hex[2:]).decode("utf-8")

def str2hex(str):
    """
    Encodes a string as a hex string
    """
    return "0x" + str.encode("utf-8").hex()


def convert_to_dict(inp):
    i=0
    while i<(len(inp)-1):
        if(inp[i]=='{'):
            ip=inp[0:i+1]+"\""+inp[i+1:]
            inp=ip
            i+=1
        elif (inp[i]==':'and not(inp[i-1]=="\"")):
            ip=inp[0:i]+"\""+inp[i:]
            i+=1
            inp=ip
        elif (inp[i]==" " and not(inp[i+1]=='{')):
            ip=inp[0:i+1]+"\""+inp[i+1:]
            i+=1
            inp=ip
        elif(inp[i]=="," ):
            ip=inp[0:i]+"\""+inp[i:]
            i+=1
            inp=ip
        elif(inp[i]=="}" and not(inp[i-1]=="}") ):
            ip=inp[0:i]+"\""+inp[i:]
            i+=1
            inp=ip
        i+=1
    return inp

def handel_spaces(inp,c):
    i=0
    while(i<len(inp)):
        if inp[i]==c:
            inp[i]=' '
    return inp

def give_file(file_id):
    f = open('files/'+file_id+'.json')
    data = json.load(f)
    return data

def get_files(file_list):
    result={}
    for fl in file_list:
        result[fl]=give_file(fl)
    return result

def make_request(input,req_function):
    input = json.dumps(input)
    response1 = requests.post(request_url+req_function, input)
    output=str(response1.text)
    print("Final OUt is ",output)
    notice = {"payload": str2hex(output)}
    response = requests.post(rollup_server + "/notice", json=notice)
    logger.info(f"Received notice status {response.status_code} body {response.content}")
    return response1.json,"accept"


def handel_file(json_object,id=0):
    #Tested 
    id+='.json'
    with open("files/"+id, "w") as outfile:
        outfile.write(json_object)
    return id


def handle_advance(data):
    logger.info(f"Received advance request data {data}")
    logger.info("Adding notice")
    input=hex2str(data["payload"])
    input = json.dumps(input)
    input = json.loads(convert_to_dict(input))
    try:
        input['file']=handel_spaces(input['file'],'#')
    except:
        pass
    print("******************INput is ",input)
    print("Type input is ",type(input))
    req_function=input["function"]
    if(req_function in file_functions):
        if req_function==file_functions[0]:
            output=str(get_files([input['patient_id']]))
            print("Final OUt is ",output)
            notice = {"payload": str2hex(output)}
            response = requests.post(rollup_server + "/notice", json=notice)
            logger.info(f"Received notice status {response.status_code} body {response.content}")
            return "accept"
        elif req_function==file_functions[3]:
            res=make_request(input,req_function)
            file_id=res[0]['file_id']
            file=input['file']
            json_object = json.dumps(file)
            handel_file(json_object,id=file_id)
            return "accept"
        elif req_function==file_functions[1]:
            res=make_request(input,req_function)
            file=input['file']
            json_object = json.dumps(file)
            handel_file(json_object,id="basic_record"+input['patient_id'])
            return "accept"
        elif req_function==file_functions[2]:
            pass
        elif req_function==file_functions[4]:
            res=make_request(input,req_function)
            return "accept"
        elif req_function==file_functions[5]:
            res=make_request(input,req_function)
            return "accept"
        elif req_function==file_functions[6]:
            res=make_request(input,req_function)
            return "accept"
        elif req_function==file_functions[7]:
            res=make_request(input,req_function)
            return "accept" 
    input = json.dumps(input)
    response1 = requests.post(request_url+req_function, input)
    output=str(response1.text)
    print("Final OUt is ",output)
    notice = {"payload": str2hex(output)}
    response = requests.post(rollup_server + "/notice", json=notice)
    logger.info(f"Received notice status {response.status_code} body {response.content}")
    return "accept"

def handle_inspect(data):
    logger.info(f"Received inspect request data {data}")
    logger.info("Adding report")
    report = {"payload": data["payload"]}
    response = requests.post(rollup_server + "/report", json=report)
    logger.info(f"Received report status {response.status_code}")
    return "accept"

handlers = {
    "advance_state": handle_advance,
    "inspect_state": handle_inspect,
}

finish = {"status": "accept"}
rollup_address = None

while True:
    logger.info("Sending finish")
    response = requests.post(rollup_server + "/finish", json=finish)
    logger.info(f"Received finish status {response.status_code}")
    if response.status_code == 202:
        logger.info("No pending rollup request, trying again")
    else:
        rollup_request = response.json()
        data = rollup_request["data"]
        print("***************************** Data Recieved = ",data)
        if "metadata" in data:
            metadata = data["metadata"]
            if metadata["epoch_index"] == 0 and metadata["input_index"] == 0:
                rollup_address = metadata["msg_sender"]
                logger.info(f"Captured rollup address: {rollup_address}")
                continue
        handler = handlers[rollup_request["request_type"]]
        finish["status"] = handler(rollup_request["data"])