import json
from flask import Flask, render_template, request, jsonify
from flask.wrappers import Response
app = Flask(__name__)
@app.route("/home" )
def home():
    return render_template("InputOutput.html")  
@app.route("/go")
def form():
    return render_template("home.html")   
@app.route("/")
def go():
    return render_template("start.html")  

@app.route("/call", methods=["POST"])

def processJSON2(): 
    jsonStr = request.get_json()
    jsonObj = json.loads(jsonStr)
    value=(jsonObj["mycall"])
    cards=[114,113,112,111,110,109,108,107,106,105,104,103,102,214,213,212,211,210,209,208,207,206,205,204,203,202,314,313,312,311,310,309,308,307,306,305,304,303,302,414,413,412,411,410,409,408,407,406,405,404,403,402]

    if(value=="n"):
        random.shuffle(cards)

        k=0
        for i in range(4):
            for j in range(13):
                player[i][j]=cards[k]
                k+=1
        l1=[]
        l2=[]
        l3=[]
        l4=[]
        for i in range(4):
            for j in range(13):
                if((player[i][j]//100)==1):
                    l1.append(player[i][j])
                elif((player[i][j]//100)==2):
                    l2.append(player[i][j])
                elif((player[i][j]//100)==3):
                    l3.append(player[i][j])
                else:
                    l4.append(player[i][j])
            p[i][0]=l1
            p[i][1]=l2
            p[i][2]=l3
            p[i][3]=l4
            l1=[]
            l2=[]
            l3=[]
            l4=[]
        for i in range (4):
            for j in range(4):
                p[i][j].sort()
        print("player1: "+str(p[0]))
        print()
        print("player2: "+str(p[1]))
        print()
        print("player3: "+str(p[2]))
        print()
        print("player4: "+str(p[3]))
        print()
        up=random.choice(p)
        ind=p.index(up)
        print("You are playing with these cards "+str(up))
        print("You are player "+str(ind+1))
        print()
        print("Let's Start ...")
        count=0
        start=1
        pn=1
        i=0
        round=0
        crd5=0
        win=0
        ind2=0
        cds=""
        

        dic["count"]=0
        dic["start"]=1
        dic["pn"]=1
        dic["i"]=0
        dic["round"]=0
        dic["win"]=0
        dic["ind2"]=0
        dic["up"]=up
        dic["ma"]=0
        dic["ind"]=ind
        dic["pl"]=0
        dic["card"]="000"

        ind=dic["ind"]
        up=""
        for m in p[ind]:
                for n in m:
                    up+=str(n)
        c=[0,0,0]
        temp3=-1
        temp4=0
        for i in p:
            temp4+=1
            if(temp4-1==ind):
                continue
            temp3+=1
            for j in i:
                for k in j:
                    if k%100>10:
                        c[temp3]+=1
        dic["c"]=c
        dic2=str(up)+"e"+str(ind)
        for i in range(3):
            if(c[i]<10):
                c[i]="0"+str(c[i])
            else:
                c[i]=str(c[i]) 
            dic2+=str(c[i])  
        response=str(dic2)     
        return response
    elif(value=="t"):
        cards=open("./static/cards.txt","r")
        content=cards.read()
        count2=0
        indn=""
        ln1=""
        ln2=""
        ln3=""
        ln4=""
        d1=0
        d2=0
        d3=0
        d4=0
        d5=0
        for con in content:
            if(con=="="):
                count2+=1
                continue
            if count2==1 and d1==0:
                if(con=="."):
                    d1=1
                else:
                    print((con))
                    indn+=(con)
            if count2==2 and d2==0:
                if(con=="."):
                    d2=1
                else:
                    ln1+=con
            if count2==3 and d3==0:
                if(con=="."):
                    d3=1
                else:
                    ln2+=con
            if count2==4 and d4==0:
                if(con=="."):
                    d4=1
                else:
                    ln3+=con
            if count2==5 and d5==0:
                if(con=="."):
                    d5=1
                else:
                    ln4+=con
        print(eval(ln1))
        print(eval(ln2))
        print(eval(ln3))
        print(eval(ln4))
        indn=eval(indn)
        print(indn)
        dic["ind"]=indn
        p[0]=eval(ln1)
        p[1]=eval(ln2)
        p[2]=eval(ln3)
        p[3]=eval(ln4)
        up=""
        for m in p[(indn)]:
                for n in m:
                    up+=str(n)
        c=[0,0,0]
        temp3=-1
        temp4=0
        for i in p:
            temp4+=1
            if(temp4-1==indn):
                continue
            temp3+=1
            for j in i:
                for k in j:
                    if k%100>10:
                        c[temp3]+=1
        dic["c"]=c
        dic2=str(up)+"e"+str(indn)
        for i in range(3):
            if(c[i]<10):
                c[i]="0"+str(c[i])
            else:
                c[i]=str(c[i]) 
            dic2+=str(c[i])  
        response=str(dic2)     
        return response
    else:
        if(int(value)>9):
            dic["cp"]=str(value)
        else:
            dic["cp"]=str(0)+str(value)
        return "start"
                


            

@app.route("/cards", methods=["POST"])

def processJSON():
    jsonStr = request.get_json()
    jsonObj = json.loads(jsonStr)
    value=(jsonObj['value'])
    
    if(value=="yes"):
        return "yes"
    elif(value=="no"):
        return "no"
    else:
        round=dic["round"]
        pn=dic["pn"]
        i=dic["i"]
        start=dic["start"]
        count=dic["count"]
        win=dic["win"]
        ind2=dic["ind2"]
        ma=dic["ma"]
        ind=dic["ind"]
        up=""
        pl=dic["pl"]
        card=dic["card"]
        cp=dic["cp"]
        c=dic["c"]
        win2=0
        ma2=0
        if(value!="over"):
        
            value=int(value)
            
            print(ind2)
            if(value!=0):    
                if pn==i+1:
                    count+=1
                    dic["count"]=count
                    pn+=1
                    dic["pn"]=pn
                    temp=list(filter(None,p[i]))
                    print("st"+str(start))
                    if(start==1):
                        start=0
                        if(ind==i):
                            crd1=value
                            ma=crd1
                            win=pn
                            ind2=crd1//100
                            dic["ind2"]=ind2
                            p[i][ind2-1].remove(crd1)
                            card=crd1
                            pl=pn-1
                        else:
                            crd2=sorted(temp,key=lambda x: (x[-1]%100))[-1][-1]
                            ind2=crd2//100
                            dic["ind2"]=ind2
                            p[i][ind2-1].remove(crd2)
                            card=crd2
                            pl=pn-1
                            ma=crd2
                            win=pn
                    else:
                        if(ind==i):
                            crd3=value
                            if (crd3//100==ind2):
                                if crd3>=ma:
                                    ma=crd3
                                    win=pn
                                p[i][ind2-1].remove(crd3)
                                card=crd3
                                pl=pn-1
                            else:
                                ind6=crd3//100
                                p[i][ind6-1].remove(crd3)
                                card=crd3
                                pl=pn-1
                        else:
                            if p[i][ind2-1]==[]:
                                crd4=sorted(temp,key=lambda x: (x[0]%100))[0][0]
                                ind3=crd4//100
                                p[i][ind3-1].remove(crd4)
                                card=crd4
                                pl=pn-1
                            else:
                                find=False
                                print(ind2)
                                for k in (p[i][ind2-1]):
                                    if k>=ma:
                                        ma=k
                                        win=pn
                                        crd5=k
                                        find=True
                                        p[i][ind2-1].remove(crd5)
                                        card=crd5
                                        pl=pn-1
                                        break
                                if find==False:
                                    crd5=p[i][ind2-1][0]
                                    p[i][ind2-1].remove(crd5)
                                    card=crd5
                                    pl=pn-1
                
                # print("player1: "+str(p[0]))
                # print()
                # print("player2: "+str(p[1]))
                # print()
                # print("player3: "+str(p[2]))
                # print()
                # print("player4: "+str(p[3]))
                print(p[ind])
                
                i+=1
                dic["count"]=count
                print("cot"+str(count))
                
                if(i==4):
                    i=0
                    dic["i"]=i
                if(pn==5):
                    pn=1
                    dic["pn"]=pn
            

                if(count==4):
                    print("This round wins by player "+str(win-1))
                    print("maximum card is: "+str(ma))
                    win2=win-1
                    ma2=ma
                    count=0
                    dic["count"]=count
                    pn=win-1
                    i=win-2
                    dic["pn"]=pn
                    start=1
                    round+=1
                    dic["round"]=round
                else:
                    win2=0
                    ma2=0
                dic["start"]=start
                dic["i"]=i
                dic["ma"]=ma
                dic["win"]=win
            print(p[ind])
            for m in p[ind]:
                    for n in m:
                        up+=str(n)
            print(up)
            print(c)
        dic2=str(up)+"e"+str(count)+str(start)+str(i)+str(round)+str(win2)+str(ma2)+str(ind2)+str(pn-1)+str(ind+1)+str(card)+str(pl)+str(ind)+(cp)
        for i in range(3):
            
            dic2+=(c[i]) 
        response=str(dic2)
        return response
if __name__ == "__main__":
    l=[]
    import random
    cards=[114,113,112,111,110,109,108,107,106,105,104,103,102,214,213,212,211,210,209,208,207,206,205,204,203,202,314,313,312,311,310,309,308,307,306,305,304,303,302,414,413,412,411,410,409,408,407,406,405,404,403,402]
# like if a no is 110 then the 1st dugut denote the suit and the last two digits denote the cardno
# where 11 stands for joker 12 for queen 13 for king and 14 for ace
    random.shuffle(cards)
    p=[[[]]*4 for i in range(4)]
    player=[[0]*13 for i in range(4)]

    k=0
    for i in range(4):
        for j in range(13):
            player[i][j]=cards[k]
            k+=1
    l1=[]
    l2=[]
    l3=[]
    l4=[]
    for i in range(4):
        for j in range(13):
            if((player[i][j]//100)==1):
                l1.append(player[i][j])
            elif((player[i][j]//100)==2):
                l2.append(player[i][j])
            elif((player[i][j]//100)==3):
                l3.append(player[i][j])
            else:
                l4.append(player[i][j])
        p[i][0]=l1
        p[i][1]=l2
        p[i][2]=l3
        p[i][3]=l4
        l1=[]
        l2=[]
        l3=[]
        l4=[]
    for i in range (4):
        for j in range(4):
            p[i][j].sort()
    print("player1: "+str(p[0]))
    print()
    print("player2: "+str(p[1]))
    print()
    print("player3: "+str(p[2]))
    print()
    print("player4: "+str(p[3]))
    print()
    up=random.choice(p)
    ind=p.index(up)
    print("You are playing with these cards "+str(up))
    print("You are player "+str(ind+1))
    print()
    print("Let's Start ...")
    count=0
    start=1
    pn=1
    i=0
    round=0
    crd5=0
    win=0
    ind2=0
    cds=""
    

    dic={"count":0,"start":1,"pn":1,"i":0,"round":0,"win":0,"ind2":0,"up":up,"ma":0,"ind":ind,"pl":0,"card":"000","c":0}

    app.run(debug=True)
    
